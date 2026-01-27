import { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES } from '../config/gallery-config';
import '../styles.css';

const Gallery = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const images = GALLERY_IMAGES;

    const closeLightbox = useCallback(() => {
        setIsLightboxOpen(false);
    }, []);

    const showNextImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const showPrevImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isLightboxOpen) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, closeLightbox, showNextImage, showPrevImage]);

    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLightboxOpen]);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    const handleLightboxClick = (e) => {
        if (e.target === e.currentTarget) {
            closeLightbox();
        }
    };

    if (images.length === 0) {
        return (
            <section className="gallery-section">
                <h2 className="gallery-title">Galería de Imágenes</h2>
                <div className="gallery-container">
                    <div className="gallery-empty">
                        <p>📸 Coloca tus imágenes en la carpeta <strong>public/assets/images</strong></p>
                        <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                            Luego agrega las rutas en el archivo <strong>src/config/gallery-config.js</strong>
                        </p>
                        <p style={{ marginTop: '5px', fontSize: '0.85rem', color: '#999' }}>
                            Ejemplo: '/assets/images/mi-imagen.jpg'
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="gallery-section">
            <h2 className="gallery-title">Galería de Imágenes</h2>
            <div className="gallery-container">
                {images.map((imagePath, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={imagePath}
                            alt={`Imagen ${index + 1}`}
                            loading="lazy"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                ))}
            </div>
            <div
                className={`lightbox ${isLightboxOpen ? 'active' : ''}`}
                onClick={handleLightboxClick}
            >
                <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
                <img
                    className="lightbox-image"
                    src={images[currentImageIndex]}
                    alt={`Imagen ${currentImageIndex + 1}`}
                />
                <button className="lightbox-prev" onClick={showPrevImage}>‹</button>
                <button className="lightbox-next" onClick={showNextImage}>›</button>
            </div>
        </section>
    );
};

export default Gallery;
