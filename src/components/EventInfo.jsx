import { useEffect, useRef } from 'react';
import '../styles.css';

const EventInfo = () => {
    const infoItemsRef = useRef([]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        infoItemsRef.current.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            }
        });

        return () => {
            infoItemsRef.current.forEach(el => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    return (
        <section className="event-info">
            <div className="info-card">
                <div 
                    className="info-item" 
                    ref={el => infoItemsRef.current[0] = el}
                >
                    <div className="icon">📅</div>
                    <div className="info-text">
                        <h3>Fecha</h3>
                        <p>Domingo 1 de Febrero</p>
                    </div>
                </div>
                <div 
                    className="info-item"
                    ref={el => infoItemsRef.current[1] = el}
                >
                    <div className="icon">🕐</div>
                    <div className="info-text">
                        <h3>Hora</h3>
                        <p>2:30 PM</p>
                    </div>
                </div>
                <div 
                    className="info-item"
                    ref={el => infoItemsRef.current[2] = el}
                >
                    <div className="icon">📍</div>
                    <div className="info-text">
                        <h3>Lugar</h3>
                        <p>IDMJI Cl. 2 #9-41, Puerto Colombia</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventInfo;
