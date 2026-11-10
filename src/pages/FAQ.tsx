import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
    nombre: string;
    mensaje: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        mensaje: ''
    });
    const [sending, setSending] = useState(false);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        // Crear el cuerpo del email
        const emailBody = `
Nombre: ${formData.nombre}
Mensaje: ${formData.mensaje}

---
Enviado desde el formulario de FAQ de INTERCERT
    `.trim();

        // Crear mailto link
        const mailtoLink = `mailto:info@intercertlatam.com?subject=Consulta desde FAQ - ${formData.nombre}&body=${encodeURIComponent(emailBody)}`;

        // Abrir cliente de correo del usuario
        window.location.href = mailtoLink;

        // Limpiar formulario después de 1 segundo
        setTimeout(() => {
            setFormData({ nombre: '', mensaje: '' });
            setSending(false);
            alert('Se ha abierto tu cliente de correo. Si no se abrió automáticamente, envía tu consulta a info@intercertlatam.com');
        }, 1000);
    };

    const faqs: FAQItem[] = [
        {
            question: '¿Qué es una certificación ISO?',
            answer: 'Una certificación ISO es un reconocimiento internacional que valida que una organización cumple con estándares específicos de calidad, seguridad, medio ambiente u otros aspectos de gestión. INTERCERT ayuda a las empresas a implementar y certificar estos estándares de manera eficiente.'
        },
        {
            question: '¿Cuánto tiempo toma obtener una certificación ISO?',
            answer: 'El proceso de certificación ISO generalmente toma entre 3 a 6 meses, dependiendo del tamaño de la empresa, el tipo de certificación y el nivel de preparación inicial. Nuestro equipo de INTERCERT trabaja para acelerar este proceso manteniendo los más altos estándares de calidad.'
        },
        {
            question: '¿Qué documentación necesito para iniciar el proceso de certificación?',
            answer: 'Para iniciar el proceso necesitas: Ficha RUC o registro empresarial, logo de la empresa, alcance de actividades, manual de procedimientos, organigrama, y mapa de procesos. INTERCERT te guiará en la preparación de toda la documentación necesaria.'
        },
        {
            question: '¿Cuáles son los costos de la certificación ISO?',
            answer: 'Los costos varían según el tipo de certificación, el tamaño de la empresa y el alcance del proyecto. Ofrecemos planes personalizados y flexibles. Contacta con INTERCERT para recibir una cotización adaptada a las necesidades específicas de tu empresa.'
        },
        {
            question: '¿La certificación ISO es válida internacionalmente?',
            answer: 'Sí, las certificaciones ISO emitidas por INTERCERT son reconocidas internacionalmente. Nuestros certificados cumplen con los estándares de acreditación internacional IAF (International Accreditation Forum), lo que garantiza su validez en todos los países.'
        },
        {
            question: '¿Qué normas ISO ofrece INTERCERT?',
            answer: 'INTERCERT ofrece certificación en múltiples normas ISO incluyendo: ISO 9001 (Calidad), ISO 14001 (Medio Ambiente), ISO 45001 (Seguridad y Salud), ISO 27001 (Seguridad de la Información), ISO 22000 (Inocuidad Alimentaria), entre otras.'
        },
        {
            question: '¿Necesito renovar mi certificación ISO?',
            answer: 'Sí, las certificaciones ISO requieren auditorías de seguimiento anuales y una renovación completa cada 3 años. INTERCERT te acompañará durante todo el ciclo de vida de tu certificación, asegurando el mantenimiento continuo de los estándares.'
        },
        {
            question: '¿Qué beneficios obtengo con una certificación ISO?',
            answer: 'Los beneficios incluyen: mejora de la eficiencia operacional, reducción de costos, mayor satisfacción del cliente, acceso a nuevos mercados, cumplimiento legal, ventaja competitiva, y reconocimiento internacional de la calidad de tu empresa.'
        },
        {
            question: '¿INTERCERT opera en múltiples países?',
            answer: 'Sí, INTERCERT LATAM opera en Perú, Colombia, Ecuador, México, Panamá, España y República Dominicana. Ofrecemos servicios localizados con el respaldo de estándares internacionales.'
        },
        {
            question: '¿Puedo verificar la autenticidad de un certificado emitido por INTERCERT?',
            answer: 'Sí, todos nuestros certificados pueden ser verificados en línea a través de nuestra plataforma de verificación. Solo necesitas el código único del certificado para confirmar su autenticidad y vigencia.'
        }
    ];

    return (
        <div>
            {/* Breadcrumb */}
            <div
                className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb z-index-1 fix p-relative"
                data-background="/assets/images/OFICINA INTERCERT.png"
                style={{
                    backgroundImage: 'url(/assets/images/OFICINAINTERCERT.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tv-breadcrumb-content z-index-1 text-center">
                                <div className="tv-breadcrumb-title-box">
                                    <h3 className="tv-breadcrumb-title">FAQs</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><Link to="/">Inicio</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>FAQs</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Area */}
            <div className="tv-faq-area pt-130 pb-130">
                <div className="container">
                    <div className="row gy-4">
                        {/* Columna Izquierda - Título y Formulario */}
                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <div className="tv-faq-left-wrap">
                                <div className="tv-section-title-box mb-50">
                                    <span className="tv-section-subtitle">Preguntas</span>
                                    <h4 className="tv-section-title">Preguntas Frecuentes Sobre Certificación ISO</h4>
                                    <p>
                                        Si necesitas asistencia inmediata, no dudes en contactarnos.
                                        Nuestro equipo de expertos en certificación está listo para ayudarte.
                                    </p>
                                </div>
                                <div className="tv-faq-form">
                                    <h4>¿Tienes alguna pregunta?</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="tv-contact-input-box mb-24">
                                            <input
                                                type="text"
                                                name="nombre"
                                                placeholder="Nombre Completo *"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="it-contact-textarea-box mb-24">
                                            <textarea
                                                name="mensaje"
                                                placeholder="Tu Mensaje *"
                                                value={formData.mensaje}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <button className="tv-btn-primary" type="submit" disabled={sending}>
                                            <span className="btn-wrap">
                                                <span className="btn-text1">{sending ? 'Enviando...' : 'Enviar Pregunta'}</span>
                                                <span className="btn-text2">{sending ? 'Enviando...' : 'Enviar Pregunta'}</span>
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Columna Derecha - Accordion */}
                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                            <div className="tv-custom-accordion tv-custom-accordion-style-2 style-3">
                                <div className="accordion" id="accordionExample">
                                    {faqs.map((faq, index) => (
                                        <div className="accordion-items" key={index}>
                                            <h2 className="accordion-header" id={`heading${index}`}>
                                                <button
                                                    className={`accordion-buttons ${activeIndex === index ? '' : 'collapsed'}`}
                                                    type="button"
                                                    onClick={() => toggleAccordion(index)}
                                                    aria-expanded={activeIndex === index}
                                                    aria-controls={`collapse${index}`}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span>Q{index + 1}. {faq.question}</span>
                                                    <i className={`ri-arrow-${activeIndex === index ? 'up' : 'down'}-s-line`}
                                                        style={{
                                                            fontSize: '24px',
                                                            marginLeft: '10px',
                                                            flexShrink: 0
                                                        }}
                                                    ></i>
                                                </button>
                                            </h2>
                                            {activeIndex === index && (
                                                <div className="accordion-body d-flex align-items-center">
                                                    <p className="mb-0">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
