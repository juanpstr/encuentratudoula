# 🌐 Despliegue en Hostinger - Guía Completa

## 📋 Requisitos Previos

- ✅ Cuenta de Hostinger con hosting web
- ✅ Dominio configurado
- ✅ Acceso SSH o File Manager
- ✅ Node.js (si Hostinger lo soporta) o hosting estático

## 🎯 Opciones de Despliegue

### Opción 1: Deploy Estático (Recomendado para Hostinger)
Hostinger normalmente usa hosting web tradicional, ideal para sitios estáticos.

### Opción 2: VPS con Node.js
Si tienes VPS en Hostinger con Node.js.

---

## 🔨 OPCIÓN 1: Deploy Estático (Más Común)

### Paso 1: Preparar la aplicación para producción

```bash
# En tu máquina local
cd /Users/juanpstr/encuentratudoulav2

# Instalar dependencias
npm install

# Crear build de producción
npm run build
```

### Paso 2: Configurar variables de entorno para producción

Crear archivo `.env.production`:
```env
VITE_APP_URL=https://tudominio.com
VITE_USE_LOCAL_DATA=true
```

### Paso 3: Subir archivos a Hostinger

**Opción A: File Manager de Hostinger**
1. Ve al Panel de Control de Hostinger
2. Abre File Manager
3. Navega a `public_html/` (o tu carpeta del dominio)
4. Sube todo el contenido de la carpeta `dist/` generada por `npm run build`

**Opción B: FTP/SFTP**
```bash
# Usar FileZilla o similar
# Host: tu-dominio.com
# Usuario: tu-usuario-hostinger
# Contraseña: tu-contraseña
# Puerto: 21 (FTP) o 22 (SFTP)
```

### Paso 4: Configurar archivo .htaccess

Crear `.htaccess` en `public_html/`:
```apache
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

---

## 🔨 OPCIÓN 2: VPS con Node.js

### Solo si tienes VPS con Node.js habilitado:

```bash
# Conectar por SSH
ssh usuario@tu-servidor.com

# Clonar repositorio (necesitarías GitHub)
git clone https://github.com/tu-usuario/encuentratudoulav2.git
cd encuentratudoulav2

# Instalar dependencias
npm install

# Instalar PM2 para manejo de procesos
npm install -g pm2

# Crear archivo de configuración PM2
echo '{
  "name": "encuentratudoula",
  "script": "npm",
  "args": "run preview",
  "env": {
    "NODE_ENV": "production",
    "PORT": "3000"
  }
}' > ecosystem.config.json

# Construir aplicación
npm run build

# Iniciar con PM2
pm2 start ecosystem.config.json
pm2 save
pm2 startup
```

---

## 🔄 Sistema de Updates Automáticos

### Para implementar cambios desde el chat:

#### Opción A: Script de Deploy Automático
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Iniciando deploy..."

# Build de la aplicación
npm run build

# Comprimir archivos
tar -czf dist.tar.gz -C dist .

# Subir a servidor (requiere configurar SSH keys)
scp dist.tar.gz usuario@servidor:/tmp/

# Extraer en servidor
ssh usuario@servidor "cd /public_html && tar -xzf /tmp/dist.tar.gz && rm /tmp/dist.tar.gz"

echo "✅ Deploy completado"
```

#### Opción B: GitHub Actions (Recomendado)
1. Subir código a GitHub
2. Configurar GitHub Actions para deploy automático
3. Cada cambio se despliega automáticamente

---

## 🎮 Configuración para Updates desde Chat

### 1. Crear cuenta GitHub (si no tienes)
### 2. Subir código a GitHub
### 3. Configurar GitHub Actions

Crear `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Hostinger
      uses: SamKirkland/FTP-Deploy-Action@4.3.3
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/
        server-dir: ./public_html/
```

---

## 📋 Lista de Tareas

### Inmediatas:
1. ✅ Aplicación funcionando localmente
2. ⏳ Crear build de producción
3. ⏳ Configurar variables de entorno
4. ⏳ Subir a Hostinger

### Para automatización:
1. ⏳ Crear repositorio GitHub
2. ⏳ Configurar GitHub Actions
3. ⏳ Configurar credenciales FTP en GitHub Secrets

---

## 🆘 Soporte

Si tienes algún problema:
1. Verifica que Hostinger soporte tu tipo de aplicación
2. Revisa los logs del File Manager
3. Contacta soporte de Hostinger si necesitas Node.js

---

**Estado:** Listo para implementar ✅

