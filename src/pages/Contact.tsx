import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentCountry } from '../config/countries';
import { useBuildCountryUrl } from '../hooks/useBuildCountryUrl';
import { useSeoMetadata } from '../hooks/useSeoMetadata';
import { getSeoConfig } from '../config/seoConfig';
import { buildHreflangLinks } from '../utils/hreflang';
import { announceFormSuccess } from '../utils/formSuccess';

interface FormData {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    taxId: string;
}

interface Feedback {
    type: 'success' | 'error' | null;
    message: string;
}

interface Option {
    value: string;
    label: string;
}

const serviceOptions: Option[] = [
    { value: 'certificacion-inicial', label: 'Certificación Inicial' },
    { value: 'seguimiento-1', label: 'Seguimiento 1' },
    { value: 'seguimiento-2', label: 'Seguimiento 2' },
    { value: 'recertificacion', label: 'Re-certificación' },
    { value: 'auditoria-interna', label: 'Auditorías internas y de seguimiento' },
];

const isoOptions: Option[] = [
    { value: 'iso9001', label: 'ISO 9001 - Sistema de Gestión de Calidad' },
    { value: 'iso14001', label: 'ISO 14001 - Sistema de Gestión Ambiental' },
    { value: 'iso45001', label: 'ISO 45001 - Sistema de Gestión de Seguridad y Salud en el Trabajo' },
    { value: 'iso37001', label: 'ISO 37001 - Sistema de Gestión Antisoborno' },
    { value: 'iso27001', label: 'ISO 27001 - Sistema de Gestión de Seguridad de la Información' },
    { value: 'iso27701', label: 'ISO 27701 - Sistema de Gestión de Privacidad' },
    { value: 'iso22301', label: 'ISO 22301 - Sistema de Gestión de Continuidad del Negocio' },
    { value: 'iso22000', label: 'ISO 22000 - Sistema de Gestión de Seguridad Alimentaria' },
    { value: 'iso21001', label: 'ISO 21001 - Sistema de Gestión Educativa' },
    { value: 'iso20000-1', label: 'ISO 20000-1 - Sistema de Gestión de Servicios TI' },
    { value: 'iso42001', label: 'ISO 42001 - Sistema de Gestión de Inteligencia Artificial' },
    { value: 'iso55001', label: 'ISO 55001 - Sistema de Gestión de Activos' },
    { value: 'iso31001', label: 'ISO 31001 - Sistema de Gestión de Riesgos' },
    { value: 'iso50001', label: 'ISO 50001 - Sistema de Gestión Energética' },
    { value: 'iso39001', label: 'ISO 39001 - Sistema de Gestión de Seguridad Vial' },
    { value: 'iso13485', label: 'ISO 13485 - Sistema de Gestión de Dispositivos Médicos' },
    { value: 'haccp', label: 'HACCP - Análisis de Peligros y Puntos Críticos de Control' },
    { value: 'ds49001', label: 'DS 49001 - Sistema de Gestión de Responsabilidad Social Empresarial' },
    { value: 'iso18788', label: 'ISO 18788 - Sistema de Gestión de Operaciones de Seguridad Privada' }
];

const sanitizeInput = (value: string) => {
    if (!value) return '';
    let cleaned = value.replace(/[<>]/g, '');
    cleaned = cleaned.replace(/['"`]/g, '');
    cleaned = cleaned.replace(/(--|;|\/\*|\*\/)/g, ' ');
    cleaned = cleaned.replace(/\s+/g, ' ');
    return cleaned.slice(0, 160);
};

const Contact = () => {
    const navigate = useNavigate();
    const { buildUrl } = useBuildCountryUrl();
    const [selectedISOs, setSelectedISOs] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        taxId: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>({ type: null, message: '' });
    const currentCountry = getCurrentCountry();
    const seoConfig = getSeoConfig(currentCountry.code);
    const helmet = useSeoMetadata({
        title: seoConfig.contact.title,
        description: seoConfig.contact.description,
        schema: seoConfig.schema.organization,
        hreflangs: buildHreflangLinks('/contact'),
    });
    const contactEmail = currentCountry.email || 'info@intercert.com.pe';
    const contactPhone = currentCountry.phone || '+51 986 123 418';
    const contactPhoneHref = `tel:${contactPhone.replace(/\s+/g, '')}`;
    const linkColor = '#159dbc';
    const contactOffices = currentCountry.contactOffices ?? [];

    const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

    const whatsappPhone =
        currentCountry.code === 'global' || currentCountry.code === 'pe'
            ? '51986123418'
            : (currentCountry.phone || '').replace(/[^\d]/g, '');

    const whatsappBlock = (
        <div style={{ marginTop: '15px' }}>
            <a
                href={`https://api.whatsapp.com/send?phone=${whatsappPhone}&text=Hola vengo de intercertlatam.com/${currentCountry.code}. Deseo más información sobre los certificados ISO.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#25d366',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    fontSize: '16px',
                }}
            >
                <i className="ri-whatsapp-line" style={{ fontSize: '22px' }}></i>
                Escríbenos al WhatsApp
            </a>
        </div>
    );

    const handleServiceSelect = (value: string) => {
        setSelectedService(value);
        setIsServiceDropdownOpen(false);
    };

    const handleISOToggle = (value: string) => {
        console.log('Toggling ISO:', value);
        setSelectedISOs(prev =>
            prev.includes(value)
                ? prev.filter(iso => iso !== value)
                : [...prev, value]
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const safeValue = name === 'email' ? value.trim() : sanitizeInput(value);
        setFormData((prev) => ({
            ...prev,
            [name]: safeValue,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFeedback({ type: null, message: '' });

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.businessName.trim() ||
            !formData.taxId.trim()
        ) {
            setFeedback({ type: 'error', message: 'Completa todos los campos obligatorios (incluye Razón Social y RUC).' });
            return;
        }

        setSubmitting(true);
        try {
            // Obtener token si está disponible
            const authToken = localStorage.getItem('authToken');
            const headers: HeadersInit = { 'Content-Type': 'application/json' };
            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }

            // Generar mensaje automático con los datos seleccionados
            const selectedServiceLabel = serviceOptions.find(opt => opt.value === selectedService)?.label || '';
            const selectedISOLabels = selectedISOs.map(iso =>
                isoOptions.find(opt => opt.value === iso)?.label || iso
            );

            let autoMessage = `Solicitud de información:\n`;
            if (selectedServiceLabel) {
                autoMessage += `\nServicio: ${selectedServiceLabel}`;
            }
            if (selectedISOLabels.length > 0) {
                autoMessage += `\nCertificaciones ISO de interés: ${selectedISOLabels.join(', ')}`;
            }

            const response = await fetch('/api/forms/contact/', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    business_name: formData.businessName.trim(),
                    tax_id: formData.taxId.trim(),
                    service: selectedService,
                    isos: selectedISOs,
                    message: autoMessage,
                    country_code: currentCountry.code,
                }),
            });

            let result;
            try {
                result = await response.json();
            } catch (e) {
                result = { error: 'Error al procesar la respuesta del servidor.' };
            }

            if (response.ok) {
                setFormData({ name: '', email: '', phone: '', businessName: '', taxId: '' });
                setSelectedISOs([]);
                setSelectedService('');
                setFeedback({ type: null, message: '' });
                announceFormSuccess(
                    navigate,
                    buildUrl,
                    result.message || '¡Formulario enviado correctamente! Nos pondremos en contacto contigo pronto.',
                );
            } else {
                const errorMessage = result.error || result.message || `Error ${response.status}: No pudimos enviar tu mensaje. Inténtalo nuevamente.`;
                console.error('Contact form error:', errorMessage, result);
                setFeedback({ type: 'error', message: errorMessage });
            }
        } catch (error) {
            setFeedback({ type: 'error', message: 'Error de conexión. Por favor intenta más tarde.' });
        } finally {
            setSubmitting(false);
        }
    };

    const getServiceDisplayText = () => {
        if (!selectedService) return 'Seleccionar Servicio *';
        const option = serviceOptions.find(opt => opt.value === selectedService);
        return option ? option.label : 'Seleccionar Servicio *';
    };

    const getDisplayText = () => {
        if (selectedISOs.length === 0) return 'Seleccionar Certificaciones ISO';
        if (selectedISOs.length === 1) {
            const option = isoOptions.find(opt => opt.value === selectedISOs[0]);
            if (option) {
                // Truncar texto largo para que quepa en el campo
                return option.label.length > 50 ? option.label.substring(0, 47) + '...' : option.label;
            }
            return 'Seleccionar Certificaciones ISO';
        }
        return `${selectedISOs.length} certificaciones seleccionadas`;
    };

    // No necesitamos useEffect para nice-select ya que usamos dropdowns personalizados

    // Cerrar dropdowns al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.custom-multi-select') && !target.closest('.custom-service-select')) {
                setIsDropdownOpen(false);
                setIsServiceDropdownOpen(false);
            }
        };

        if (isDropdownOpen || isServiceDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen, isServiceDropdownOpen]);

    useEffect(() => {
        // Manejar data-background para React (solo una vez)
        const elements = document.querySelectorAll('[data-background]');
        elements.forEach(element => {
            const el = element as HTMLElement;
            const backgroundImage = el.getAttribute('data-background');
            if (backgroundImage && !el.style.backgroundImage) {
                el.style.backgroundImage = `url(${backgroundImage})`;
            }
        });
    }, []);

    return (
        <>
            {helmet}
            {/* breadcrumb-area-start */}
            <div className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb z-index-1 fix p-relative" data-background="/assets/images/breadcrumb/_dbr9nwdbr9nwdbr9.png">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tv-breadcrumb-content z-index-1 text-center">
                                <div className="tv-breadcrumb-title-box">
                                    <h3 className="tv-breadcrumb-title">Contacto</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><a href="/">Inicio</a></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>Contacto</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* breadcrumb-area-end */}

            {/* contact area start */}
            <div
                className="tv-contact-area pt-130 pb-130"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '32px',
                    margin: '0 auto',
                    maxWidth: '1400px',
                    paddingLeft: '40px',
                    paddingRight: '40px',
                }}
            >
                <div className="container">
                    <div className="tv-contact-wrap">
                        <div className="row gy-4 align-items-center">
                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                <div className="tv-contact-left-wrap">
                                    <div className="tv-section-title-box mb-44">
                                        <span className="tv-section-subtitle">Contacto</span>
                                        <h4 className="tv-section-title">Construyamos Juntos el Futuro de tu Empresa</h4>
                                        <p>Cada proyecto de certificación ISO es único. Podemos personalizar casi cualquier aspecto de la implementación de tu sistema de gestión con solo unos clics. Cada certificación se adapta a las necesidades específicas de tu empresa.</p>
                                        <div style={{ marginTop: '20px', lineHeight: 1.8 }}>
                                            {contactOffices.length > 0 ? (
                                                <>
                                                    {contactOffices.map((office, index) => (
                                                        <div
                                                            key={office.title}
                                                            style={{ marginTop: index > 0 ? '20px' : 0 }}
                                                        >
                                                            <div
                                                                style={{
                                                                    fontWeight: 600,
                                                                    marginBottom: '8px',
                                                                    fontSize: '1.05rem',
                                                                }}
                                                            >
                                                                {office.title}
                                                            </div>
                                                            {office.phone && (
                                                                <div>
                                                                    <strong>Teléfono:</strong>{' '}
                                                                    <a
                                                                        href={phoneHref(office.phone)}
                                                                        style={{ color: linkColor }}
                                                                    >
                                                                        {office.phone}
                                                                    </a>
                                                                </div>
                                                            )}
                                                            {office.mobilePhone && (
                                                                <div>
                                                                    <strong>Teléfono móvil:</strong>{' '}
                                                                    <a
                                                                        href={phoneHref(office.mobilePhone)}
                                                                        style={{ color: linkColor }}
                                                                    >
                                                                        {office.mobilePhone}
                                                                    </a>
                                                                </div>
                                                            )}
                                                            {office.email && (
                                                                <div>
                                                                    <strong>Email:</strong>{' '}
                                                                    <a
                                                                        href={`mailto:${office.email}`}
                                                                        style={{ color: linkColor }}
                                                                    >
                                                                        {office.email}
                                                                    </a>
                                                                </div>
                                                            )}
                                                            {office.address && (
                                                                <div>
                                                                    <strong>Dirección:</strong> {office.address}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {whatsappBlock}
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <strong>Teléfono:</strong>{' '}
                                                        <a href={contactPhoneHref} style={{ color: linkColor }}>
                                                            {contactPhone}
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <strong>Email:</strong>{' '}
                                                        <a
                                                            href={`mailto:${contactEmail}`}
                                                            style={{ color: linkColor }}
                                                        >
                                                            {contactEmail}
                                                        </a>
                                                    </div>
                                                    {currentCountry.address && (
                                                        <div>
                                                            <strong>Dirección:</strong> {currentCountry.address}
                                                        </div>
                                                    )}
                                                    {whatsappBlock}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tv-card-box mb-40 wow itfadeUp" data-wow-delay=".2s">
                                        <div className="icon">
                                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M29.7344 0C29.2598 0 28.875 0.384828 28.875 0.859375V4.8125C28.875 5.28705 29.2598 5.67188 29.7344 5.67188C30.2089 5.67188 30.5938 5.28705 30.5938 4.8125V0.859375C30.5938 0.384828 30.2089 0 29.7344 0Z" fill="white"></path>
                                                <path d="M9.96875 26.8125C9.49437 26.8125 9.10938 27.1975 9.10938 27.6719C9.10938 28.1463 9.49437 28.5312 9.96875 28.5312C10.4431 28.5312 10.8281 28.1463 10.8281 27.6719C10.8281 27.1975 10.4431 26.8125 9.96875 26.8125Z" fill="white"></path>
                                                <path d="M41.7656 25.0938C41.7656 23.1983 40.2236 21.6562 38.3281 21.6562H31.9127C32.9059 19.1122 33.3079 16.1178 33.2304 13.4523C33.2156 12.9436 33.1961 12.6495 33.1697 12.4643C33.1253 10.6074 31.6006 9.10938 29.7344 9.10938C27.8389 9.10938 26.2969 10.6514 26.2969 12.5469V13.4062C26.2969 18.8415 19.3175 21.8952 14.0504 23.2048C13.6522 22.2943 12.7432 21.6562 11.6875 21.6562H3.09375C2.6192 21.6562 2.23438 22.0411 2.23438 22.5156V43.1406C2.23438 43.6152 2.6192 44 3.09375 44H11.6875C12.7361 44 13.6399 43.3703 14.0423 42.4695C14.4784 42.5814 14.8833 42.6871 15.257 42.7848C18.2575 43.5684 19.9103 44 23.9302 44H33.1719C35.0673 44 36.6094 42.4579 36.6094 40.5625C36.6094 39.8557 36.3948 39.1983 36.0276 38.6514C37.3551 38.1871 38.3281 36.9187 38.3281 35.4062C38.3281 34.7021 38.1188 34.0425 37.7527 33.4931C39.0744 33.028 40.0469 31.7625 40.0469 30.25C40.0469 29.5432 39.8323 28.8858 39.4651 28.3389C40.7926 27.8746 41.7656 26.6062 41.7656 25.0938ZM12.5469 41.4219C12.5469 41.8957 12.1614 42.2812 11.6875 42.2812H3.95312V23.375H11.6875C12.1614 23.375 12.5469 23.7605 12.5469 24.2344V41.4219ZM38.3281 26.8125C36.4849 26.8125 36.0455 26.8125 34.0312 26.8125C33.5567 26.8125 33.1719 27.1973 33.1719 27.6719C33.1719 28.1464 33.5567 28.5312 34.0312 28.5312H36.6094C37.5571 28.5312 38.3281 29.3023 38.3281 30.25C38.3281 31.1993 37.5586 31.9688 36.6094 31.9688H32.3125C31.838 31.9688 31.4531 32.3536 31.4531 32.8281C31.4531 33.3027 31.838 33.6875 32.3125 33.6875H34.8906C35.8271 33.6875 36.6094 34.4356 36.6094 35.4062C36.6094 36.3555 35.8399 37.125 34.8906 37.125C33.0474 37.125 32.608 37.125 30.5938 37.125C30.1192 37.125 29.7344 37.5098 29.7344 37.9844C29.7344 38.4589 30.1192 38.8438 30.5938 38.8438H33.1719C34.1196 38.8438 34.8906 39.6148 34.8906 40.5625C34.8906 41.5102 34.1196 42.2812 33.1719 42.2812H23.9302C20.1311 42.2812 18.6473 41.8938 15.6913 41.1218C15.2583 41.0087 14.7833 40.8847 14.2656 40.7527V24.924C20.4847 23.4426 28.0156 19.8267 28.0156 13.4062V12.5469C28.0156 11.5992 28.7867 10.8281 29.7344 10.8281C30.6804 10.8281 31.4513 11.598 31.4531 12.5442V12.5469C31.4531 12.9204 31.9193 17.504 30.0501 21.6562H27.1562C26.6817 21.6562 26.2969 22.0411 26.2969 22.5156C26.2969 22.9902 26.6817 23.375 27.1562 23.375C27.7564 23.375 37.3486 23.375 38.3281 23.375C39.2758 23.375 40.0469 24.146 40.0469 25.0938C40.0469 26.043 39.2774 26.8125 38.3281 26.8125Z" fill="white"></path>
                                                <path d="M9.96875 30.25C9.4942 30.25 9.10938 30.6348 9.10938 31.1094V37.9844C9.10938 38.4589 9.4942 38.8438 9.96875 38.8438C10.4433 38.8438 10.8281 38.4589 10.8281 37.9844V31.1094C10.8281 30.6348 10.4433 30.25 9.96875 30.25Z" fill="white"></path>
                                                <path d="M22.8594 10.8281H19.4219C18.9473 10.8281 18.5625 11.213 18.5625 11.6875C18.5625 12.162 18.9473 12.5469 19.4219 12.5469H22.8594C23.3339 12.5469 23.7188 12.162 23.7188 11.6875C23.7188 11.213 23.3339 10.8281 22.8594 10.8281Z" fill="white"></path>
                                                <path d="M40.0469 10.8281H36.6094C36.1348 10.8281 35.75 11.213 35.75 11.6875C35.75 12.162 36.1348 12.5469 36.6094 12.5469H40.0469C40.5214 12.5469 40.9062 12.162 40.9062 11.6875C40.9062 11.213 40.5214 10.8281 40.0469 10.8281Z" fill="white"></path>
                                                <path d="M37.6337 3.79069C37.298 3.45519 36.754 3.45519 36.4182 3.79069L33.988 6.22091C33.6524 6.5565 33.6524 7.10066 33.988 7.43633C34.3238 7.77191 34.8677 7.77183 35.2034 7.43633L37.6337 5.0061C37.9692 4.67052 37.9692 4.12636 37.6337 3.79069Z" fill="white"></path>
                                                <path d="M25.4813 6.22091L23.0511 3.79069C22.7154 3.45519 22.1714 3.45519 21.8357 3.79069C21.5001 4.12627 21.5001 4.67043 21.8357 5.0061L24.2659 7.43633C24.6017 7.77191 25.1456 7.77183 25.4813 7.43633C25.8169 7.10074 25.8169 6.55659 25.4813 6.22091Z" fill="white"></path>
                                            </svg>
                                        </div>
                                        <div className="content">
                                            <h4>350+ Proyectos Completados</h4>
                                            <p>Desde banca y seguros hasta gestión de riqueza y seguridad en el sector</p>
                                        </div>
                                    </div>
                                    <div className="tv-card-box mb-40 wow itfadeUp" data-wow-delay=".3s">
                                        <div className="icon">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_2505_4399)">
                                                    <path d="M20.7812 31.7188C20.7812 32.1503 20.4315 32.5 20 32.5C19.5685 32.5 19.2188 32.1503 19.2188 31.7188C19.2188 31.2872 19.5685 30.9375 20 30.9375C20.4315 30.9375 20.7812 31.2872 20.7812 31.7188Z" fill="white"></path>
                                                    <path d="M37.4219 24.6875C37.4219 22.1027 35.3192 20 32.7344 20C30.1495 20 28.0469 22.1027 28.0469 24.6875C28.0469 27.2723 30.1495 29.375 32.7344 29.375C35.3192 29.375 37.4219 27.2723 37.4219 24.6875ZM32.7344 27.8125C31.0114 27.8125 29.6094 26.4105 29.6094 24.6875C29.6094 22.9645 31.0114 21.5625 32.7344 21.5625C34.4574 21.5625 35.8594 22.9645 35.8594 24.6875C35.8594 26.4105 34.4574 27.8125 32.7344 27.8125Z" fill="white"></path>
                                                    <path d="M32.7344 29.375C30.7657 29.375 28.8025 30.1923 27.4652 31.5173C25.705 29.2041 22.9907 27.8125 20 27.8125C17.1359 27.8125 14.3607 29.1193 12.5351 31.5173C11.1975 30.1926 9.23462 29.375 7.26562 29.375C3.32733 29.375 0 32.5949 0 36.4062V37.9688C0 38.4003 0.349731 38.75 0.78125 38.75H39.2188C39.6503 38.75 40 38.4003 40 37.9688V36.4062C40 32.5949 36.6727 29.375 32.7344 29.375ZM1.5625 36.4062C1.5625 33.4418 4.17419 30.9375 7.26562 30.9375C8.95721 30.9375 10.6348 31.687 11.6733 32.8784C10.9866 34.2047 10.625 35.683 10.625 37.1875H1.5625V36.4062ZM20 29.375C24.3472 29.375 27.8125 32.9022 27.8125 37.1875H12.1875C12.1875 32.8452 15.7236 29.375 20 29.375ZM38.4375 37.1875H29.375C29.375 35.683 29.0134 34.2047 28.3267 32.8784C29.3652 31.687 31.0428 30.9375 32.7344 30.9375C35.8258 30.9375 38.4375 33.4418 38.4375 36.4062V37.1875Z" fill="white"></path>
                                                    <path d="M11.9531 24.6875C11.9531 22.1027 9.85046 20 7.26562 20C4.68079 20 2.57812 22.1027 2.57812 24.6875C2.57812 27.2723 4.68079 29.375 7.26562 29.375C9.85046 29.375 11.9531 27.2723 11.9531 24.6875ZM7.26562 27.8125C5.5426 27.8125 4.14062 26.4105 4.14062 24.6875C4.14062 22.9645 5.5426 21.5625 7.26562 21.5625C8.98865 21.5625 10.3906 22.9645 10.3906 24.6875C10.3906 26.4105 8.98865 27.8125 7.26562 27.8125Z" fill="white"></path>
                                                    <path d="M26.25 21.5625C26.25 18.1161 23.4464 15.3125 20 15.3125C16.5536 15.3125 13.75 18.1161 13.75 21.5625C13.75 25.0089 16.5536 27.8125 20 27.8125C23.4464 27.8125 26.25 25.0089 26.25 21.5625ZM20 26.25C17.4152 26.25 15.3125 24.1473 15.3125 21.5625C15.3125 18.9777 17.4152 16.875 20 16.875C22.5848 16.875 24.6875 18.9777 24.6875 21.5625C24.6875 24.1473 22.5848 26.25 20 26.25Z" fill="white"></path>
                                                    <path d="M26.1828 5.79376C26.0909 5.51086 25.8465 5.30487 25.552 5.26215L22.1822 4.77295L20.6734 1.68823C20.5425 1.41998 20.2703 1.25 19.9718 1.25C19.6734 1.25 19.4012 1.41998 19.2699 1.68793L17.7614 4.77295L14.3917 5.26184C14.0972 5.30457 13.8528 5.51086 13.7609 5.79376C13.669 6.07666 13.7456 6.38702 13.9587 6.59454L16.3988 8.97278L15.823 12.3312C15.7726 12.6242 15.8932 12.9205 16.1339 13.0951C16.3732 13.269 16.6918 13.2938 16.9567 13.1546L19.9718 11.5692L22.9882 13.1546C23.2513 13.2932 23.5702 13.27 23.8109 13.0951C24.0514 12.9202 24.172 12.6242 24.1216 12.3309L23.5451 8.97278L25.985 6.59454C26.198 6.38702 26.2746 6.07666 26.1828 5.79376ZM22.1599 8.14056C21.9759 8.32001 21.8917 8.5788 21.9353 8.83209L22.3135 11.0352L20.3353 9.99512C20.1076 9.87549 19.8357 9.87549 19.6081 9.99512L17.6305 11.0352L18.0083 8.83209C18.0517 8.57849 17.9674 8.32001 17.7834 8.14056L16.1831 6.58081L18.3941 6.25977C18.6498 6.22284 18.8705 6.06171 18.9837 5.82977L19.9718 3.80951L20.9597 5.82977C21.0732 6.06201 21.2939 6.22284 21.5493 6.25977L23.7606 6.58081L22.1599 8.14056Z" fill="white"></path>
                                                    <path d="M37.8602 11.6492C37.7683 11.3663 37.5238 11.1603 37.2294 11.1176L34.9463 10.7858L33.9255 8.71674C33.794 8.45001 33.5227 8.28125 33.2251 8.28125C33.2251 8.28125 33.2251 8.28125 33.2248 8.28125C32.9276 8.28125 32.656 8.45001 32.5245 8.71674L31.503 10.7858L29.2197 11.1176C28.9255 11.1603 28.6811 11.3663 28.5892 11.6492C28.4971 11.9321 28.5737 12.2424 28.7867 12.45L30.4386 14.061L30.0486 16.3345C29.9985 16.6275 30.1188 16.9235 30.3595 17.0984C30.6 17.2733 30.9189 17.2964 31.182 17.1582L33.2248 16.0849L35.2671 17.1582C35.5301 17.2964 35.8493 17.2733 36.0898 17.0984C36.3303 16.9238 36.4505 16.6275 36.4005 16.3345L36.0105 14.061L37.6627 12.45C37.8757 12.2424 37.952 11.9321 37.8602 11.6492ZM34.6259 13.2291C34.4416 13.4085 34.3576 13.667 34.4013 13.9203L34.5929 15.0385L33.5886 14.5108C33.3609 14.3912 33.089 14.3912 32.8617 14.5108L31.8564 15.0388L32.0484 13.9203C32.0917 13.667 32.0078 13.4085 31.8238 13.2291L31.0108 12.4362L32.1341 12.2733C32.3887 12.2363 32.6087 12.0764 32.7225 11.846L33.2248 10.8282L33.7268 11.8457C33.8407 12.0764 34.0607 12.2363 34.3152 12.2733L35.4386 12.4362L34.6259 13.2291Z" fill="white"></path>
                                                    <path d="M11.2977 11.6492C11.2058 11.3663 10.9613 11.1603 10.6669 11.1176L8.38383 10.7858L7.36302 8.71674C7.23149 8.45001 6.96019 8.28125 6.66264 8.28125C6.36509 8.28125 6.09349 8.45001 5.96196 8.71674L4.94053 10.7858L2.65721 11.1176C2.36302 11.1603 2.11857 11.3663 2.02672 11.6492C1.93455 11.9321 2.01115 12.2424 2.22416 12.45L3.87608 14.061L3.48637 16.3345C3.43602 16.6275 3.55656 16.9235 3.79704 17.0984C4.03752 17.2733 4.35643 17.2964 4.61979 17.1582L6.66234 16.0849L8.70457 17.1582C8.96946 17.2974 9.28807 17.2723 9.52733 17.0984C9.7678 16.9238 9.88835 16.6275 9.83799 16.3345L9.44798 14.061L11.1002 12.45C11.3132 12.2424 11.3895 11.9321 11.2977 11.6492ZM8.06309 13.2291C7.87907 13.4085 7.79515 13.667 7.83848 13.9203L8.03044 15.0385L7.0258 14.5108C6.79844 14.3912 6.52653 14.3912 6.29918 14.5108L5.29362 15.0388L5.48558 13.9203C5.52922 13.667 5.44499 13.4085 5.26097 13.2291L4.44798 12.4362L5.57164 12.2733C5.82585 12.2363 6.04588 12.0764 6.15971 11.846L6.66203 10.8282L7.16404 11.8457C7.27787 12.0764 7.49791 12.2363 7.75242 12.2733L8.87578 12.4362L8.06309 13.2291Z" fill="white"></path>
                                                    <path d="M23.4232 31.9605C23.0625 31.7234 22.5782 31.8238 22.3414 32.1845C22.1043 32.5449 22.2047 33.0293 22.5654 33.2664C23.2877 33.7409 23.8651 34.4026 24.235 35.1795C24.4199 35.5686 24.8856 35.735 25.276 35.5491C25.6657 35.3639 25.8311 34.8975 25.6458 34.5081C25.1533 33.473 24.3845 32.5919 23.4232 31.9605Z" fill="white"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2505_4399">
                                                        <rect width="40" height="40" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="content">
                                            <h4>500+ Clientes Satisfechos</h4>
                                            <p>Desde banca y seguros hasta gestión de riqueza y seguridad en el sector</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 wow itfadeUp" data-wow-delay=".2s">
                                <div className="cta-form" style={{ backgroundColor: '#159dbc', padding: '40px', borderRadius: '15px 15px 0 0', position: 'relative', zIndex: 1 }}>
                                    <h2 style={{ color: '#ffffff' }}>Solicitar Información</h2>
                                    <p style={{ color: '#ffffff' }}>Contáctanos sin compromiso, no enviamos spam a tu email</p>
                                    <div className="tv-contact-select">
                                        <form onSubmit={handleSubmit}>
                                            <div className="it-contact-input-box mb-20">
                                                <label className="form-label">Nombre Completo *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Ingresa tu nombre completo"
                                                    autoCapitalize="none"
                                                    autoCorrect="off"
                                                    style={{ textTransform: 'none' }}
                                                    required
                                                />
                                            </div>
                                            <div className="it-contact-input-box mb-20">
                                                <label className="form-label">Correo Electrónico *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="ejemplo@correo.com"
                                                    autoCapitalize="none"
                                                    autoCorrect="off"
                                                    style={{ textTransform: 'none' }}
                                                    required
                                                />
                                            </div>
                                            <div className="it-contact-input-box mb-20">
                                                <label className="form-label">Teléfono *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+51 999 999 999"
                                                    autoCapitalize="none"
                                                    autoCorrect="off"
                                                    style={{ textTransform: 'none' }}
                                                    required
                                                />
                                            </div>
                                            <div className="it-contact-input-box mb-20">
                                                <label className="form-label">Razón Social *</label>
                                                <input
                                                    type="text"
                                                    name="businessName"
                                                    value={formData.businessName}
                                                    onChange={handleInputChange}
                                                    placeholder="Ingresa la razón social"
                                                    autoCapitalize="none"
                                                    autoCorrect="off"
                                                    style={{ textTransform: 'none' }}
                                                    required
                                                />
                                            </div>
                                            <div className="it-contact-input-box mb-20">
                                                <label className="form-label">RUC / RFC / NIT *</label>
                                                <input
                                                    type="text"
                                                    name="taxId"
                                                    value={formData.taxId}
                                                    onChange={handleInputChange}
                                                    placeholder="Ingresa el identificador tributario"
                                                    autoCapitalize="none"
                                                    autoCorrect="off"
                                                    style={{ textTransform: 'none' }}
                                                    required
                                                />
                                            </div>
                                            <div className="it-contact-input-box mb-20">
                                                <label className="form-label">Tipo de Servicio *</label>
                                                <div className="custom-service-select" style={{ position: 'relative', width: '100%' }}>
                                                    <div
                                                        className={`nice-select custom-dropdown ${isServiceDropdownOpen ? 'open' : ''}`}
                                                        onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                                                    >
                                                        <span className="current">
                                                            {getServiceDisplayText()}
                                                        </span>
                                                        {/*<span className="arrow"></span>*/}
                                                    </div>

                                                    {isServiceDropdownOpen && (
                                                        <div className="dropdown-list">
                                                            {serviceOptions.map((option) => {
                                                                return (
                                                                    <div
                                                                        key={option.value}
                                                                        className={`dropdown-option ${selectedService === option.value ? 'selected' : ''}`}
                                                                        onClick={() => handleServiceSelect(option.value)}
                                                                    >
                                                                        {option.label}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="it-contact-input-box mb-20">
                                                <label className="form-label">Certificaciones ISO de Interés</label>
                                                <div className="custom-multi-select" style={{ position: 'relative', width: '100%', zIndex: isDropdownOpen ? 9999 : 1 }}>
                                                    <div
                                                        className={`nice-select custom-dropdown ${isDropdownOpen ? 'open' : ''}`}
                                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    >
                                                        <span className="current">
                                                            {getDisplayText()}
                                                        </span>
                                                        {/*<span className="arrow"></span>*/}
                                                    </div>

                                                    {isDropdownOpen && (
                                                        <div className="dropdown-list" style={{ zIndex: 10000 }}>
                                                            {isoOptions.map((option) => (
                                                                <div
                                                                    key={option.value}
                                                                    className={`dropdown-option ${selectedISOs.includes(option.value) ? 'selected' : ''}`}
                                                                    onClick={() => handleISOToggle(option.value)}
                                                                    title={option.label}
                                                                >
                                                                    {option.label}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {feedback.message && (
                                                <div
                                                    style={{
                                                        background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                        color: feedback.type === 'success' ? '#065F46' : '#991B1B',
                                                        borderRadius: '10px',
                                                        padding: '12px 16px',
                                                        marginBottom: '16px',
                                                    }}
                                                >
                                                    {feedback.message}
                                                </div>
                                            )}
                                            <div style={{ marginTop: '80px', width: '100%', textAlign: 'center' }}>
                                                <button
                                                    type="submit"
                                                    disabled={submitting}
                                                    style={{
                                                        display: 'inline-block',
                                                        width: 'auto',
                                                        minWidth: '200px',
                                                        maxWidth: '300px',
                                                        padding: '15px 40px',
                                                        backgroundColor: '#ffffff',
                                                        color: '#159dbc',
                                                        border: '2px solid #ffffff',
                                                        borderRadius: '8px 0px 8px 0px',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        cursor: submitting ? 'not-allowed' : 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        opacity: submitting ? 0.7 : 1
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!submitting) {
                                                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                    }}
                                                >
                                                    {submitting ? 'Enviando...' : 'Enviar Mensaje'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* contact area end */}

            {/* google map start */}
            <div className="tv-google-map wow itfadeUp" data-wow-delay=".2s">
                <iframe
                    className="tv-map"
                    src={currentCountry.mapEmbedUrl || 'https://www.google.com/maps?q=Centro+Empresarial+PLEXUS+Piso+11,+San+Miguel,+Lima&output=embed'}
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Ubicación de INTERCERT - ${currentCountry.address || 'Latam'}`}
                ></iframe>
            </div>
            {/* google map end */}
        </>
    );
};

export default Contact;
