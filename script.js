document.addEventListener('DOMContentLoaded', function() {
    // ========== Audio Player ==========
    const audio = document.getElementById('backgroundAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const progressBar = document.getElementById('progressBar');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const volumeIcon = volumeBtn.querySelector('.volume-icon');
    const muteIcon = volumeBtn.querySelector('.mute-icon');
    
    let isPlaying = false;
    let isMuted = false;

    // Intentar cargar el audio
    audio.addEventListener('error', function() {
        console.log('No se encontró el archivo de audio. Por favor, coloca un archivo llamado "background.mp3" o "background.ogg" en la carpeta assets/audio');
        document.getElementById('audioPlayer').style.display = 'none';
    });

    // Control de reproducción
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
            isPlaying = false;
        } else {
            audio.play().catch(function(error) {
                console.log('Error al reproducir audio:', error);
            });
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
            isPlaying = true;
        }
    });

    // Control de volumen
    volumeBtn.addEventListener('click', function() {
        if (isMuted) {
            audio.volume = 1;
            volumeIcon.style.display = 'inline';
            muteIcon.style.display = 'none';
            isMuted = false;
        } else {
            audio.volume = 0;
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'inline';
            isMuted = true;
        }
    });

    // Actualizar barra de progreso
    audio.addEventListener('timeupdate', function() {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
        }
    });

    // Click en la barra de progreso para cambiar posición
    const audioProgress = document.querySelector('.audio-progress');
    audioProgress.addEventListener('click', function(e) {
        const rect = audioProgress.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    });

    // ========== Gallery ==========
    const galleryContainer = document.getElementById('galleryContainer');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    let images = [];

    // Lista de imágenes conocidas (puedes agregar más aquí)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    
    // Función para cargar imágenes dinámicamente
    function loadGalleryImages() {
        // Usar las imágenes del archivo de configuración si está disponible
        let imagePaths = [];
        
        if (typeof GALLERY_IMAGES !== 'undefined' && GALLERY_IMAGES.length > 0) {
            imagePaths = GALLERY_IMAGES;
        }

        // Si no hay imágenes configuradas, mostrar mensaje
        if (imagePaths.length === 0) {
            galleryContainer.innerHTML = `
                <div class="gallery-empty">
                    <p>📸 Coloca tus imágenes en la carpeta <strong>assets/images</strong></p>
                    <p style="margin-top: 10px; font-size: 0.9rem;">Luego agrega las rutas en el archivo <strong>gallery-config.js</strong></p>
                    <p style="margin-top: 5px; font-size: 0.85rem; color: #999;">Ejemplo: 'assets/images/mi-imagen.jpg'</p>
                </div>
            `;
            return;
        }

        images = imagePaths;
        renderGallery();
    }

    function renderGallery() {
        galleryContainer.innerHTML = '';
        images.forEach((imagePath, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Imagen ${index + 1}`;
            img.loading = 'lazy';
            
            img.addEventListener('error', function() {
                galleryItem.style.display = 'none';
            });
            
            galleryItem.appendChild(img);
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryContainer.appendChild(galleryItem);
        });
    }

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = images[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });

    // Cargar galería
    loadGalleryImages();

    // ========== Formulario ==========
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            ciudad: document.getElementById('ciudad').value.trim()
        };

        // Validación básica
        if (!formData.nombre || !formData.email || !formData.telefono || !formData.ciudad) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Aquí puedes agregar la lógica para enviar los datos a un servidor
        // Por ahora, solo mostramos el mensaje de éxito
        console.log('Datos del formulario:', formData);

        // Ocultar el formulario y mostrar mensaje de éxito
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Opcional: Aquí puedes enviar los datos a un endpoint
        // fetch('/api/registro', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     form.style.display = 'none';
        //     successMessage.style.display = 'block';
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('Hubo un error al procesar tu inscripción. Por favor, intenta nuevamente.');
        // });
    });

    // ========== Animaciones al hacer scroll ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.info-item, .description, .registration-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
