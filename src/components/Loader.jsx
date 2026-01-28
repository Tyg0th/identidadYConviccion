import { useState, useEffect } from 'react';
import '../styles.css';

const Loader = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1800); // 1.8 segundos

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <div className="loader-spinner"></div>
            </div>
        </div>
    );
};

export default Loader;
