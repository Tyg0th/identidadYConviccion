import { useState, useRef, useEffect } from 'react';
import '../styles.css';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showPlayer, setShowPlayer] = useState(true);
    const [hasScrolled, setHasScrolled] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        // Establecer volumen al 70%
        audio.volume = 0.7;
        
        const handleTimeUpdate = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        const handleError = () => {
            console.log('No se encontró el archivo de audio. Por favor, coloca un archivo llamado "background.mp3" o "background.ogg" en la carpeta public/assets/audio');
            setShowPlayer(false);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('error', handleError);
        };
    }, []);

    // Detectar scroll y reproducir música automáticamente
    useEffect(() => {
        const handleScroll = () => {
            if (!hasScrolled && window.scrollY > 50) {
                setHasScrolled(true);
                const audio = audioRef.current;
                if (audio && !isPlaying) {
                    // Intentar reproducir música cuando el usuario hace scroll
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                setIsPlaying(true);
                                console.log('Audio iniciado automáticamente al hacer scroll');
                            })
                            .catch((error) => {
                                console.log('Error al reproducir audio automáticamente:', error);
                                // Si falla, intentar con interacción del usuario
                            });
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled, isPlaying]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch((error) => {
                console.log('Error al reproducir audio:', error);
            });
            setIsPlaying(true);
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (isMuted) {
            audio.volume = 0.7;
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    const handleProgressClick = (e) => {
        const audio = audioRef.current;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    };

    if (!showPlayer) return null;

    return (
        <div className="audio-player">
            <div className="audio-controls">
                <button 
                    className="audio-btn" 
                    onClick={togglePlayPause}
                    aria-label="Reproducir/Pausar"
                >
                    <span className="play-icon" style={{ display: isPlaying ? 'none' : 'inline' }}>▶</span>
                    <span className="pause-icon" style={{ display: isPlaying ? 'inline' : 'none' }}>⏸</span>
                </button>
                <div className="audio-info">
                    <span className="audio-label"></span>
                    <div className="audio-progress" onClick={handleProgressClick}>
                        <div className="audio-progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <button 
                    className="audio-btn volume-btn" 
                    onClick={toggleMute}
                    aria-label="Silenciar/Activar sonido"
                >
                    <span className="volume-icon" style={{ display: isMuted ? 'none' : 'inline' }}>🔊</span>
                    <span className="mute-icon" style={{ display: isMuted ? 'inline' : 'none' }}>🔇</span>
                </button>
            </div>
            <audio ref={audioRef} loop>
                <source src="/assets/audio/background.mp3" type="audio/mpeg" />
                <source src="/assets/audio/background.ogg" type="audio/ogg" />
                Tu navegador no soporta el elemento de audio.
            </audio>
        </div>
    );
};

export default AudioPlayer;
