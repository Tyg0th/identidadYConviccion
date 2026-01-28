import { useState, useEffect, useRef } from 'react';
import '../styles.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        sede: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const registrationCardRef = useRef(null);
    
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzn7Po46KtoLPu7BWsFcE3CCuZNYwTQxEkAAlh784Affox6aAFiA6WtOA1k2sUVUP0_Rw/exec';

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

        if (registrationCardRef.current) {
            registrationCardRef.current.style.opacity = '0';
            registrationCardRef.current.style.transform = 'translateY(30px)';
            registrationCardRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(registrationCardRef.current);
        }

        return () => {
            if (registrationCardRef.current) {
                observer.unobserve(registrationCardRef.current);
            }
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.nombre || !formData.sede) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Preparar los datos para enviar (solo nombre y sede como espera el script)
            const dataToSend = {
                nombre: formData.nombre.trim(),
                sede: formData.sede.trim()
            };

            console.log('Enviando datos:', dataToSend);
            console.log('URL del script:', GOOGLE_SCRIPT_URL);

            // Enviar datos a Google Apps Script
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script requiere no-cors
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });

            // Con no-cors no podemos ver la respuesta, pero asumimos éxito
            console.log('Petición enviada. Respuesta (no-cors):', response);
            console.log('Datos enviados exitosamente:', dataToSend);
            
            // Mostrar mensaje de éxito
            setShowSuccess(true);
            
            // Limpiar el formulario
            setFormData({
                nombre: '',
                sede: ''
            });

        } catch (error) {
            console.error('Error al enviar datos:', error);
            console.error('Detalles del error:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            alert('Hubo un error al procesar tu inscripción. Por favor, intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="registration">
            <div className="registration-card" ref={registrationCardRef}>
                <h2>¡Acompáñanos!</h2>
                {!showSuccess ? (
                    <form className="registration-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre completo *</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sede">Sede *</label>
                            <select
                                id="sede"
                                name="sede"
                                value={formData.sede}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una sede</option>
                                <option value="Baranoa">Baranoa</option>
                                <option value="Barranquilla - Colina Campestre">Barranquilla - Colina Campestre</option>
                                <option value="Barranquilla - Boston">Barranquilla - Boston</option>
                                <option value="Barranquilla - Sierrita">Barranquilla - Sierrita</option>
                                <option value="Barranquilla - Las Nieves">Barranquilla - Las Nieves</option>
                                <option value="Barranquilla - Riomar">Barranquilla - Riomar</option>
                                <option value="Campo de la Cruz">Campo de la Cruz</option>
                                <option value="Candelaria">Candelaria</option>
                                <option value="Galapa">Galapa</option>
                                <option value="Juan de Acosta">Juan de Acosta</option>
                                <option value="Luruaco">Luruaco</option>
                                <option value="Malambo">Malambo</option>
                                <option value="Manatí">Manatí</option>
                                <option value="Palmar de Varela">Palmar de Varela</option>
                                <option value="Piojó">Piojó</option>
                                <option value="Polonuevo">Polonuevo</option>
                                <option value="Ponedera">Ponedera</option>
                                <option value="Puerto Colombia">Puerto Colombia</option>
                                <option value="Repelón">Repelón</option>
                                <option value="Sabanagrande">Sabanagrande</option>
                                <option value="Sabanalarga">Sabanalarga</option>
                                <option value="Santa Lucía">Santa Lucía</option>
                                <option value="Santo Tomás">Santo Tomás</option>
                                <option value="Soledad - La Loma">Soledad - La Loma</option>
                                <option value="Soledad - Villa Estadio">Soledad - Villa Estadio</option>
                                <option value="Suan">Suan</option>
                                <option value="Tubará">Tubará</option>
                                <option value="Usiacurí">Usiacurí</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Enviando...' : 'Confirmar asistencia'}
                        </button>
                    </form>
                ) : (
                    <div className="success-message">
                        <p>¡Gracias por inscribirte! Te esperamos el domingo 1 de febrero.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RegistrationForm;
