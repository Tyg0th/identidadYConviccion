# Landing Page - Ser MIRAÍSTA (React)

Landing page dinámica para la invitación al evento "Ser MIRAÍSTA" del partido MIRA, construida con React y Vite.

## 🎨 Características

- ✨ Diseño moderno y dinámico con animaciones
- 🎵 Reproductor de audio flotante
- 📸 Galería de imágenes con lightbox
- 📝 Formulario de inscripción
- 📱 Diseño responsive (móvil, tablet, desktop)
- ⚛️ Construido con React 18 y Vite

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 16+ y npm (o yarn/pnpm)

### Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Preview del Build

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
invitacionManuel/
├── public/
│   └── assets/
│       ├── audio/          # Archivos de audio
│       └── images/          # Imágenes de la galería
├── src/
│   ├── components/          # Componentes React
│   │   ├── AudioPlayer.jsx
│   │   ├── Hero.jsx
│   │   ├── EventInfo.jsx
│   │   ├── Description.jsx
│   │   ├── Gallery.jsx
│   │   ├── RegistrationForm.jsx
│   │   └── Footer.jsx
│   ├── config/
│   │   └── gallery-config.js  # Configuración de imágenes
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── styles.css            # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Configuración

### Agregar Audio de Fondo

1. Coloca tu archivo de audio en `public/assets/audio/`
2. Nombra el archivo como `background.mp3` o `background.ogg`
3. El reproductor aparecerá automáticamente en la esquina inferior derecha

**Formatos soportados:** MP3, OGG, WAV

### Agregar Imágenes a la Galería

1. Coloca tus imágenes en `public/assets/images/`
2. Abre el archivo `src/config/gallery-config.js`
3. Agrega las rutas de tus imágenes en el array `GALLERY_IMAGES`:

```javascript
export const GALLERY_IMAGES = [
    '/assets/images/imagen1.jpg',
    '/assets/images/imagen2.jpg',
    '/assets/images/imagen3.jpg',
];
```

**Nota:** Las rutas deben comenzar con `/` para referenciar archivos en `public/`

**Formatos soportados:** JPG, PNG, WEBP

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `src/styles.css`:

```css
:root {
    --primary-color: #0033A0; /* Pantone 286 */
    --white: #FFFFFF;
    /* ... */
}
```

### Modificar Componentes

Todos los componentes están en `src/components/`. Puedes editarlos según tus necesidades.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción

## 🔧 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **CSS3** - Estilos y animaciones

## 📝 Notas

- El formulario actualmente solo muestra un mensaje de confirmación. Para guardar los datos, necesitarás conectar el formulario a un backend.
- Las imágenes se cargan de forma lazy (solo cuando son visibles) para mejorar el rendimiento.
- El audio se reproduce automáticamente en bucle cuando el usuario hace clic en play.

## 🐛 Solución de Problemas

**El audio no se reproduce:**
- Verifica que el archivo esté en `public/assets/audio/background.mp3`
- Algunos navegadores requieren interacción del usuario antes de reproducir audio

**Las imágenes no aparecen:**
- Verifica que las rutas en `src/config/gallery-config.js` comiencen con `/`
- Asegúrate de que los archivos existan en `public/assets/images/`
- Verifica la consola del navegador para errores

**Error al instalar dependencias:**
- Asegúrate de tener Node.js 16+ instalado
- Intenta eliminar `node_modules` y `package-lock.json` y reinstalar

---

© 2025 Partido MIRA. Todos los derechos reservados.
# identidadYConviccion
