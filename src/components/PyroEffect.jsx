import { useEffect } from 'react';
import '../styles.css';

const PyroEffect = () => {
    useEffect(() => {
        // Versión mejorada con menos partículas y mejor distribución
        const generateBoxShadow = (particles = 50, width = 600, height = 600) => {
            let boxShadow = '';
            let boxShadow2 = '';
            
            // Generar box-shadow inicial (blanco brillante)
            for (let i = 0; i <= particles; i++) {
                boxShadow2 += '0 0 #fff';
                if (i < particles) boxShadow2 += ', ';
            }
            
            // Generar box-shadow de explosión con mejor distribución
            for (let i = 0; i <= particles; i++) {
                // Distribución circular más uniforme
                const angle = (Math.PI * 2 * i) / particles;
                const radius = Math.random() * (width / 2);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius - height / 1.5;
                
                // Colores más vibrantes y variados
                const colorSchemes = [
                    { hue: 0, sat: 100 },    // Rojo
                    { hue: 60, sat: 100 },   // Amarillo
                    { hue: 120, sat: 100 },  // Verde
                    { hue: 180, sat: 100 },  // Cyan
                    { hue: 240, sat: 100 },  // Azul
                    { hue: 300, sat: 100 },  // Magenta
                    { hue: 30, sat: 100 },   // Naranja
                    { hue: 270, sat: 100 },  // Púrpura
                ];
                const color = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
                const lightness = 50 + Math.random() * 30; // 50-80% de luminosidad
                
                boxShadow += `${Math.round(x)}px ${Math.round(y)}px hsl(${color.hue}, ${color.sat}%, ${lightness}%)`;
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
            
            // Generar box-shadow único para cada elemento con menos partículas
            const allBoxShadows = [];
            fireworkElements.forEach((element, index) => {
                // Menos partículas para fuegos más ligeros
                const particles = 40 + Math.floor(Math.random() * 20); // 40-60 partículas
                const { boxShadow, boxShadow2 } = generateBoxShadow(particles);
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
