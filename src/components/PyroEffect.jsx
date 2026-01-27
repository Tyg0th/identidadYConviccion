import { useEffect } from 'react';
import '../styles.css';

const PyroEffect = () => {
    useEffect(() => {
        // Generar box-shadow dinámicamente para el efecto de fuegos artificiales
        // Basado en el código SCSS original
        const generateBoxShadow = () => {
            const particles = 50;
            const width = 500;
            const height = 500;
            let boxShadow = '';
            let boxShadow2 = '';
            
            // Generar box-shadow inicial (blanco)
            for (let i = 0; i <= particles; i++) {
                boxShadow2 += '0 0 #fff';
                if (i < particles) boxShadow2 += ', ';
            }
            
            // Generar box-shadow de explosión (colores aleatorios)
            for (let i = 0; i <= particles; i++) {
                const x = Math.floor(Math.random() * width) - width / 2;
                const y = Math.floor(Math.random() * height) - height / 1.2;
                // Usar colores vibrantes como en el código original (HSL)
                const hue = Math.floor(Math.random() * 360);
                boxShadow += `${x}px ${y}px hsl(${hue}, 100%, 50%)`;
                if (i < particles) boxShadow += ', ';
            }
            
            return { boxShadow, boxShadow2 };
        };

        const beforeElement = document.querySelector('.pyro > .before');
        const afterElement = document.querySelector('.pyro > .after');
        
        if (beforeElement && afterElement) {
            const { boxShadow, boxShadow2 } = generateBoxShadow();
            // Establecer el box-shadow inicial
            beforeElement.style.boxShadow = boxShadow2;
            afterElement.style.boxShadow = boxShadow2;
            
            // Crear estilos dinámicos para la animación bang
            const styleId = 'pyro-bang-animation';
            let styleElement = document.getElementById(styleId);
            
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                document.head.appendChild(styleElement);
            }
            
            styleElement.textContent = `
                @keyframes bang {
                    to {
                        box-shadow: ${boxShadow};
                    }
                }
                @-webkit-keyframes bang {
                    to {
                        box-shadow: ${boxShadow};
                    }
                }
                @-moz-keyframes bang {
                    to {
                        box-shadow: ${boxShadow};
                    }
                }
                @-o-keyframes bang {
                    to {
                        box-shadow: ${boxShadow};
                    }
                }
                @-ms-keyframes bang {
                    to {
                        box-shadow: ${boxShadow};
                    }
                }
            `;
            
            return () => {
                const style = document.getElementById(styleId);
                if (style) {
                    document.head.removeChild(style);
                }
            };
        }
    }, []);

    return null;
};

export default PyroEffect;
