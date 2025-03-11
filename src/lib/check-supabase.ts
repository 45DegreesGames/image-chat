import { supabase } from './supabase';

/**
 * Verifica la configuración de Supabase
 * Esta función se puede ejecutar en la consola del navegador para verificar si Supabase está configurado correctamente
 */
export async function checkSupabaseConfig() {
  console.log('Verificando configuración de Supabase...');
  
  try {
    // Verificar conexión a Supabase
    console.log('URL de Supabase:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Clave anónima configurada:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    // Verificar configuración de autenticación
    const { data: authSettings, error: authError } = await supabase.rpc('get_auth_settings');
    
    if (authError) {
      console.error('Error al obtener configuración de autenticación:', authError);
      console.log('Solución: Ejecuta el script SQL en supabase/setup.sql');
    } else {
      console.log('Configuración de autenticación:', authSettings);
    }
    
    // Verificar tablas
    const tables = ['profiles', 'images', 'conversations', 'messages'];
    for (const table of tables) {
      const { error } = await supabase.from(table).select('count').limit(1);
      
      if (error) {
        console.error(`Error al verificar tabla ${table}:`, error);
        console.log(`Solución: Ejecuta el script SQL en supabase/setup.sql para crear la tabla ${table}`);
      } else {
        console.log(`Tabla ${table} configurada correctamente`);
      }
    }
    
    // Verificar almacenamiento
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error al verificar buckets de almacenamiento:', bucketsError);
    } else {
      const imagesBucket = buckets.find(bucket => bucket.name === 'images');
      
      if (!imagesBucket) {
        console.error('No se encontró el bucket "images"');
        console.log('Solución: Crea un bucket llamado "images" en Supabase Storage');
      } else {
        console.log('Bucket "images" configurado correctamente');
      }
    }
    
    console.log('Verificación completada');
  } catch (error) {
    console.error('Error al verificar configuración de Supabase:', error);
  }
}

// Exponer la función en el objeto window para poder ejecutarla desde la consola del navegador
if (typeof window !== 'undefined') {
  (window as any).checkSupabaseConfig = checkSupabaseConfig;
} 