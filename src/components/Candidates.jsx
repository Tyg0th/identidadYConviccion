import { useEffect, useRef } from 'react';
import '../styles.css';

const Candidates = () => {
    const candidatesRef = useRef([]);

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

        candidatesRef.current.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            }
        });

        return () => {
            candidatesRef.current.forEach(el => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    const candidates = [
        {
            name: 'Manuel Virgüez Piraquive',
            role: 'Candidato al Senado',
            image: '/assets/images/manuel-virguez.png'
        },
        {
            name: 'María Ardila',
            role: 'Candidata a la Cámara',
            location: 'Atlántico',
            image: '/assets/images/maria-ardila.png'
        }
    ];

    return (
        <section className="candidates-section">
            <div className="candidates-header">
                <h2 className="candidates-title">Nuestros Candidatos</h2>
                <p className="candidates-subtitle">Conoce a quienes nos representan en las elecciones 2026</p>
            </div>
            <div className="candidates-unified">
                {candidates.map((candidate, index) => (
                    <div
                        key={index}
                        className="candidate-unified-card"
                        ref={el => candidatesRef.current[index] = el}
                    >
                        <div className="candidate-image-wrapper">
                            <img
                                src={candidate.image}
                                alt={candidate.name}
                                className="candidate-image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="candidate-info">
                            <h3 className="candidate-name">{candidate.name}</h3>
                            <div className="candidate-role">
                                <span className="role-badge">{candidate.role}</span>
                                {candidate.location && (
                                    <span className="location-badge">{candidate.location}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Candidates;
