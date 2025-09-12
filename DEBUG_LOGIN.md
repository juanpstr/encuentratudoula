# 🔧 Debug del Login de Admin

## Problema: "Credenciales inválidas"

### Pasos para debuggear:

1. **Abrir la consola del navegador** (F12 → Console)
2. **Ir a:** http://localhost:3000/admin/login
3. **Intentar login con:**
   - Email: `admin@encuentratudoula.com`
   - Contraseña: `admin123`

### Qué logs deberías ver:

```
🔑 Intento de login: {email: "admin@encuentratudoula.com", password: "********"}
✅ Login exitoso con credenciales de desarrollo
```

### Si ves:
```
❌ Credenciales incorrectas
```

**Verifica:**
- No hay espacios extra en email/contraseña
- Estás copiando exactamente: `admin@encuentratudoula.com`
- La contraseña es exactamente: `admin123`

### Credenciales exactas:
```
Email: admin@encuentratudoula.com
Password: admin123
```

**IMPORTANTE:** Copia y pega directamente, no escribas a mano.

### Si aún no funciona:

1. **Refresca la página** (Ctrl+R o Cmd+R)
2. **Borra caché del navegador**
3. **Verifica que no hay extensiones bloqueando**

---

**Estado actual:** ✅ Sistema funcionando con autenticación local

