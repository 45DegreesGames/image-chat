import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

if (!apiKey) {
  throw new Error('Falta la clave de API de Gemini');
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
});

export async function generateChatResponse(
  prompt: string,
  imageUrls: string[]
) {
  try {
    // Convertir URLs de imágenes a objetos FileData para Gemini
    const imageData = await Promise.all(
      imageUrls.map(async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return {
          inlineData: {
            data: await blobToBase64(blob),
            mimeType: blob.type,
          },
        };
      })
    );

    // Crear la solicitud de chat con imágenes
    const result = await geminiModel.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            ...imageData,
          ],
        },
      ],
    });

    return result.response.text();
  } catch (error) {
    console.error('Error al generar respuesta de chat:', error);
    throw error;
  }
}

// Función auxiliar para convertir Blob a Base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Eliminar el prefijo "data:image/jpeg;base64," para obtener solo los datos Base64
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
} 