import { useEffect } from 'react';
import '../styles.css';

const PyroEffect = () => {
    useEffect(() => {
        // Generar box-shadow dinámicamente para el efecto de fuegos artificiales
        // Basado en el código SCSS original
        const generateBoxShadow = () => {
            const particles = 80; // Aumentado de 50 a 80
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

        // Aplicar a todos los elementos de fuegos artificiales
        const fireworkElements = document.querySelectorAll('.pyro > div');
        
        if (fireworkElements.length > 0) {
            // Crear estilos dinámicos para la animación bang
            const styleId = 'pyro-bang-animation';
            let styleElement = document.getElementById(styleId);
            
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                document.head.appendChild(styleElement);
            }
            
            // Generar box-shadow único para cada elemento
            const allBoxShadows = [];
            fireworkElements.forEach((element, index) => {
                const { boxShadow, boxShadow2 } = generateBoxShadow();
                allBoxShadows.push(boxShadow);
                // Establecer el box-shadow inicial
                element.style.boxShadow = boxShadow2;
            });
            
            // Crear keyframes individuales para cada elemento
            let keyframesContent = '';
            fireworkElements.forEach((element, index) => {
                const animationName = `bang-firework-${index}`;
                keyframesContent += `
                    @keyframes ${animationName} {
                        to {
                            box-shadow: ${allBoxShadows[index]};
                        }
                    }
                    @-webkit-keyframes ${animationName} {
                        to {
                            box-shadow: ${allBoxShadows[index]};
                        }
                    }
                    @-moz-keyframes ${animationName} {
                        to {
                            box-shadow: ${allBoxShadows[index]};
                        }
                    }
                    @-o-keyframes ${animationName} {
                        to {
                            box-shadow: ${allBoxShadows[index]};
                        }
                    }
                    @-ms-keyframes ${animationName} {
                        to {
                            box-shadow: ${allBoxShadows[index]};
                        }
                    }
                `;
                
                // Aplicar la animación específica a cada elemento
                const currentAnimations = element.style.animation || 
                    'bang 1s ease-out infinite backwards, gravity 1s ease-in infinite backwards, position 5s linear infinite backwards, pyro-fade-in 0.5s ease-in forwards';
                const newAnimations = currentAnimations.replace(/bang\s/g, `${animationName} `);
                element.style.animation = newAnimations;
            });
            
            styleElement.textContent = keyframesContent;
            
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
