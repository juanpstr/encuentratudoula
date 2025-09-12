# 🚀 **INSTRUCCIONES PARA DESPLEGAR EN HOSTINGER**

## ✅ **Estado Actual**
- ✅ **Build exitoso** - Archivos listos en `dist/`
- ✅ **Credenciales FTP** configuradas
- ✅ **Configuración Apache** (.htaccess) lista
- ✅ **Logo PNG** incluido
- ✅ **6 doulas** configuradas
- ✅ **Deploy automático** configurado (GitHub Actions)

---

## 🎯 **OPCIÓN 1: Deploy Manual Inmediato (5 minutos)**

### Pasos:
1. **Ve a tu panel de Hostinger**
2. **Abre "File Manager"** (Administrador de archivos)
3. **Navega a la carpeta `public_html/`**
4. **SUBE TODO** el contenido de la carpeta `dist/`:
   - `index.html`
   - `assets/` (carpeta completa)
   - `.htaccess`
   - `logo.png`
   - `logo.svg`
   - `logo-encuentra-tu-doula.svg`

### ⚡ **Tu web estará funcionando inmediatamente**

---

## 🤖 **OPCIÓN 2: Deploy Automático (Recomendado)**

### Para que cada cambio desde el chat se publique automáticamente:

#### Paso 1: Crear cuenta GitHub (si no tienes)
- Ve a [github.com](https://github.com)
- Crea cuenta gratuita

#### Paso 2: Crear repositorio
1. **New Repository** → `encuentratudoula`
2. **Public** o **Private** (tu elección)
3. **No** añadir README (ya tenemos archivos)

#### Paso 3: Subir código
```bash
# En terminal (desde tu carpeta del proyecto)
git init
git add .
git commit -m "🚀 Deploy inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/encuentratudoula.git
git push -u origin main
```

#### Paso 4: Configurar secretos
1. **En GitHub**: Settings → Secrets → Actions
2. **Añadir secreto**:
   - Name: `FTP_PASSWORD`
   - Value: [tu contraseña FTP de Hostinger]

#### Paso 5: ¡Listo!
- Cada cambio → automáticamente en tu web
- Tiempo de deploy: 2-3 minutos

---

## 🔧 **Cómo funciona después**

### Chat Updates:
1. **Tú**: "Cambia el color del botón a azul"
2. **Yo**: Hago el cambio y push a GitHub
3. **GitHub Actions**: Deploy automático
4. **Resultado**: Cambio visible en tu dominio

### Credenciales FTP configuradas:
- **Servidor**: 147.93.54.203
- **Usuario**: u948181550.encuentratudoula.com
- **Puerto**: 21
- **Carpeta**: public_html

---

## ⚠️ **IMPORTANTE**

### Para acceso admin en producción:
- **URL**: `tudominio.com/admin/login`
- **Usuario**: `admin@encuentratudoula.com`
- **Contraseña**: `admin123`

### Después del deploy manual:
- Confirma que funciona: `tudominio.com`
- Prueba admin: `tudominio.com/admin`
- Comprueba doulas: `tudominio.com/doulas`

---

## 🆘 **Si necesitas ayuda**

1. **Deploy manual**: Solo sube los archivos de `dist/`
2. **Problemas**: Comparte captura del error
3. **GitHub**: Te ayudo paso a paso si lo necesitas

---

## 📋 **Próximos pasos después del deploy**

1. ✅ Confirmar que funciona
2. 🔄 Configurar deploy automático (opcional)
3. 📊 Monitoreo y analytics
4. 🔒 SSL/HTTPS (Hostinger lo incluye)
5. 📧 Configurar dominio de email

---

**¿Qué opción prefieres: manual inmediato o automático completo?**
