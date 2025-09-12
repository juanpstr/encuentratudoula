# 🔐 Acceso al Panel de Administrador

## Credenciales de Acceso

Para acceder al panel de administración, usa estas credenciales:

**URL:** http://localhost:3000/admin/login

**Credenciales:**
- **Email:** `admin@encuentratudoula.com`
- **Contraseña:** `admin123`

## ¿Cómo acceder?

### Método 1: Enlace directo
1. Ve directamente a: http://localhost:3000/admin/login
2. Ingresa las credenciales mostradas arriba
3. Haz clic en "Iniciar Sesión"

### Método 2: Desde la navegación (solo si estás autenticado)
1. Una vez autenticado, el botón "Admin" aparecerá en la barra de navegación
2. Haz clic en "Admin" para ir al dashboard

## Funcionalidades del Panel Admin

Una vez dentro del panel podrás:

- ✅ **Ver Dashboard:** Estadísticas y resumen
- ✅ **Gestionar Doulas:** Agregar, editar, eliminar doulas
- ✅ **Ver Formularios:** Administrar solicitudes
- ✅ **Configuración:** Ajustes del sistema

## Nota Importante

**Modo de Desarrollo:** Actualmente funcionando con datos locales (sin Supabase).

Las credenciales están hardcodeadas para desarrollo. En producción, esto se conectaría a una base de datos real.

## Solución de Problemas

**Si no puedes acceder:**
1. Verifica que estés usando las credenciales exactas
2. Asegúrate de estar en: http://localhost:3000/admin/login
3. Revisa la consola del navegador para ver errores

**Si el botón "Admin" no aparece:**
- Es normal si no estás autenticado
- El botón solo aparece después del login exitoso

---

✅ **Estado actual:** Sistema funcionando con autenticación local de desarrollo

