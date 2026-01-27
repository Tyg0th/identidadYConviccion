import { useState, useEffect } from 'react';
import PyroEffect from './PyroEffect';
import '../styles.css';

const Hero = () => {
    const [heroOpened, setHeroOpened] = useState(false);
    const [showPyro, setShowPyro] = useState(false);

    useEffect(() => {
        // Iniciar la animación de apertura después de un pequeño delay
        const openTimer = setTimeout(() => {
            setHeroOpened(true);
        }, 100);

        // Iniciar los fuegos artificiales después de que el hero se haya abierto
        const pyroTimer = setTimeout(() => {
            setShowPyro(true);
        }, 1500); // 1.5 segundos después de que empiece la apertura

        return () => {
            clearTimeout(openTimer);
            clearTimeout(pyroTimer);
        };
    }, []);

    return (
        <div>
            {showPyro && <PyroEffect />}
            <header className={`hero ${heroOpened ? 'hero-opened' : 'hero-closed'}`}>

                {showPyro && (
                    <div className="pyro">
                        <div className="before"></div>
                        <div className="after"></div>
                        <div className="firework-1"></div>
                        <div className="firework-2"></div>
                        <div className="firework-3"></div>
                        <div className="firework-4"></div>
                    </div>
                )}
                <div className="hero-content">
                    <div className="hero-glow"></div>
                    <div className={`hero-top-image fade-in ${heroOpened ? 'visible' : ''}`}>
                        <img
                            src="/assets/images/Avancemos y MIRA.png"
                            alt="Avancemos y MIRA"
                            className="hero-logo"
                        />
                    </div>
                    <h1 className={`title fade-in-delay ${heroOpened ? 'visible' : ''}`}>
                        <span className="title-main">
                            Encuentro de<br />
                            <span className="highlight-word">Identidad</span> & <span className="highlight-word">Convicción</span>
                        </span>
                        <span className="title-shadow">
                            Encuentro de<br />
                            <span className="highlight-word">Identidad</span> & <span className="highlight-word">Convicción</span>
                        </span>
                    </h1>
                    <p className={`subtitle fade-in-delay-2 ${heroOpened ? 'visible' : ''}`}>ATLÁNTICO - 2026</p>
                    <div className={`hero-bottom-image fade-in-delay-2 ${heroOpened ? 'visible' : ''}`}>
                        <img
                            src="/assets/images/FOTO-MARIA Y MANUEL.png"
                            alt="María Ardila y Manuel Virgüez"
                            className="hero-candidates-photo"
                        />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Hero;
