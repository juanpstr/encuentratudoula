# Configuración de Supabase

## Opción 1: Usar solo datos locales (recomendado por ahora)

La aplicación está configurada para funcionar perfectamente con datos locales. No necesitas hacer nada especial.

## Opción 2: Configurar Supabase (opcional)

Si quieres conectar con una base de datos real:

### 1. Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto con:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### 2. Obtener credenciales de Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a Settings > API
4. Copia:
   - Project URL → `VITE_SUPABASE_URL`
   - anon public key → `VITE_SUPABASE_ANON_KEY`

### 3. Ejecutar migraciones

Con las credenciales configuradas, la aplicación automáticamente:
- Creará las tablas necesarias
- Insertará las 6 doulas
- Configurará las políticas de seguridad

### 4. Reactivar funciones

En `src/services/supabase.ts`, comenta las líneas de "Forzar uso de datos locales" y descomenta el código de Supabase.

## Estado actual

- ✅ Datos locales funcionando (6 doulas)
- ✅ Páginas legales completas
- ✅ Logo PNG implementado
- ✅ Códigos QR funcionando
- ⏳ Supabase opcional

La aplicación funciona perfectamente sin Supabase.

