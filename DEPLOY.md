# 🚀 Despliegue en Netlify - Árbol Cuántico

## Configuración Automática desde GitHub

### 1. Conectar Repositorio a Netlify

1. Ve a [netlify.com](https://netlify.com) y crea una cuenta
2. Haz clic en "New site from Git"
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `igwlord/Arbol-Cuantico`

### 2. Configuración de Build

Netlify detectará automáticamente la configuración desde `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### 3. Variables de Entorno (Opcional)

Si necesitas variables de entorno, agrégalas en:
- Netlify Dashboard → Site Settings → Environment Variables

### 4. Deploy Settings

**Framework preset:** Vite
**Base directory:** (déjalo vacío)
**Build command:** `npm run build`
**Publish directory:** `dist`

### 5. Configuraciones Incluidas

#### ✅ SPA Routing
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### ✅ Headers de Seguridad
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff

#### ✅ Cache Optimization
- Assets estáticos: 1 año de cache
- Fuentes: Cache inmutable

### 6. Dominios Personalizados

Una vez desplegado, puedes configurar:
- Dominio personalizado en Site Settings → Domain Management
- SSL automático (incluido gratis)
- DNS personalizado

### 7. Builds Automáticos

Cada push a la rama `main` disparará automáticamente:
1. Build del proyecto con `npm run build`
2. Deploy automático a Netlify
3. Invalidación de cache
4. Notificación de estado

### 8. Comandos Útiles

```bash
# Test local del build de producción
npm run build
npm run preview

# Deploy manual (opcional)
npm install -g netlify-cli
netlify deploy --prod
```

### 9. URLs del Proyecto

Después del despliegue:
- **URL principal:** `https://arbol-cuantico.netlify.app`
- **URL personalizada:** Configurable en Netlify si tienes dominio propio

### 10. Monitoreo

Netlify proporcionará:
- Analytics de visitantes
- Logs de builds
- Notificaciones de errores
- Performance insights

## 🔧 Troubleshooting

### Build Fails
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs en Netlify Dashboard

### SPA Routes 404
- Verifica que el archivo `netlify.toml` esté en el root
- Confirma que las redirects estén configuradas

### Audio Issues
- WebAudio API funciona solo con HTTPS
- Netlify proporciona HTTPS automáticamente

## ✅ Checklist de Despliegue

- [x] `netlify.toml` configurado
- [x] `vite.config.js` optimizado para producción  
- [x] `.gitignore` incluye `dist/` y `.netlify/`
- [x] Build local exitoso (`npm run build`)
- [x] Preview local funcional (`npm run preview`)
- [x] Repositorio GitHub actualizado
- [x] Listo para conectar a Netlify

¡Tu Árbol Cuántico está listo para volar a la nube! 🌳✨