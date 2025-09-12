# 🚀 Deploy Rápido en Hostinger

## 📦 Opción 1: Deploy Manual Inmediato

### Paso 1: Preparar archivos
```bash
# En tu terminal local
cd /Users/juanpstr/encuentratudoulav2

# Crear carpeta de deploy manual
mkdir deploy-manual
cp -r public/* deploy-manual/
cp -r src deploy-manual/src
cp index.html deploy-manual/
cp package.json deploy-manual/
```

### Paso 2: Subir a Hostinger
1. **Panel de Hostinger** → **File Manager**
2. **Navegar a** `public_html/`
3. **Subir todos los archivos** de `deploy-manual/`
4. **Crear archivo `.htaccess`**:

```apache
RewriteEngine On
RewriteBase /

# Manejar rutas de React Router
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Configurar MIME types
AddType application/javascript .js
AddType text/css .css
AddType image/svg+xml .svg

# Compresión
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/xml application/xhtml+xml application/rss+xml application/javascript application/x-javascript
</IfModule>

# Caché del navegador
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

---

## 🔄 Opción 2: Deploy Automático con GitHub

### Configuración GitHub Actions:

1. **Crear repositorio GitHub**
2. **Subir código**
3. **Configurar secrets en GitHub**:
   - `FTP_SERVER`: tu-dominio.com
   - `FTP_USERNAME`: tu-usuario-hostinger  
   - `FTP_PASSWORD`: tu-contraseña

4. **Crear `.github/workflows/deploy.yml`**:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Hostinger
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/
        server-dir: ./public_html/
        exclude: |
          **/.git*
          **/.git*/**
          **/node_modules/**
```

---

## 🛠 Para Updates desde el Chat

Una vez configurado GitHub Actions:

1. **Yo hago cambios en el código**
2. **Push a GitHub** 
3. **Deploy automático a Hostinger**
4. **Cambios visibles en tu dominio en ~2-3 minutos**

---

## 📋 Información que necesito de ti:

Para configurar el deploy automático:

- ✅ **Dominio**: ¿cuál es tu dominio?
- ✅ **Credenciales FTP** de Hostinger:
  - Usuario FTP
  - Contraseña FTP
  - Servidor FTP
- ✅ **¿Tienes cuenta GitHub?**

---

## 🎯 Próximos Pasos

**Inmediato:**
1. Dime si quieres deploy manual o automático
2. Si automático, comparte info de Hostinger
3. Creo repositorio GitHub y configuración

**Después del deploy:**
1. Cada cambio desde el chat → automáticamente en tu web
2. Monitoreo y logs de deploy
3. Backups automáticos

---

**¿Qué opción prefieres? ¿Manual para empezar o directo al automático?**

