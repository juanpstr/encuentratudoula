#!/usr/bin/env node

/**
 * 🚀 Script de Deploy Manual para Hostinger
 * Uso: node deploy-manual.js [password]
 */

const { execSync } = require('child_process');
const path = require('path');

const FTP_CONFIG = {
  server: '147.93.54.203',
  username: 'u948181550.encuentratudoula.com',
  port: 21,
  remoteDir: 'public_html'
};

async function deploy() {
  try {
    console.log('🏗️  Construyendo proyecto...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('📦 Build completado exitosamente');
    console.log('');
    console.log('📋 Para subir a Hostinger:');
    console.log('1. Ve a tu panel de Hostinger');
    console.log('2. Abre File Manager');
    console.log('3. Navega a public_html/');
    console.log('4. Sube TODO el contenido de la carpeta dist/');
    console.log('5. Sube también el archivo .htaccess');
    console.log('');
    console.log('🌐 Archivos listos en: ./dist/');
    console.log('📄 Configuración Apache: ./.htaccess');
    
  } catch (error) {
    console.error('❌ Error durante el build:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  deploy();
}
