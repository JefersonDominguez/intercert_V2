import React, { useState } from 'react';

interface DataConsentModalProps {
    isOpen: boolean;
    onAccept: () => void;
    onDecline: () => void;
    consentType?: 'form_submission' | 'certificate_verification';
}

/**
 * Modal de Consentimiento de Datos Personales
 * Cumplimiento: Ley 29733 (Protección de Datos Personales - Perú)
 */
const DataConsentModal: React.FC<DataConsentModalProps> = ({
    isOpen,
    onAccept,
    onDecline,
    consentType = 'form_submission'
}) => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleAccept = () => {
        if (!acceptedTerms) {
            alert('Debe aceptar los términos para continuar');
            return;
        }
        onAccept();
    };

    if (!isOpen) return null;

    const consentTexts = {
        'form_submission': {
            title: 'Consentimiento de Datos Personales',
            content: `
En cumplimiento de la Ley N° 29733, Ley de Protección de Datos Personales, 
INTERCERT LATAM requiere su consentimiento informado para el tratamiento de sus datos personales.

DATOS QUE RECOPILAREMOS:
• Nombre o Razón Social de la empresa
• RUC o Número de Identificación Tributaria
• Dirección de domicilio fiscal
• Correo electrónico corporativo
• Número de teléfono de contacto
• Nombre y cargo del representante legal

FINALIDAD DEL TRATAMIENTO:
• Procesamiento de solicitudes de certificación ISO
• Emisión y gestión de certificados de conformidad
• Comunicaciones relacionadas con el proceso de certificación
• Cumplimiento de obligaciones legales y regulatorias

SUS DERECHOS (Ley 29733):
• Derecho de acceso a sus datos personales
• Derecho de rectificación de datos incorrectos
• Derecho de cancelación de sus datos
• Derecho de oposición al tratamiento de datos

SEGURIDAD:
Sus datos serán almacenados en servidores seguros con encriptación y acceso restringido.
Nunca compartiremos sus datos con terceros sin su consentimiento expreso.

VIGENCIA:
Este consentimiento es válido hasta que usted lo revoque expresamente.

Para revocar su consentimiento, contacte a: proteccion-datos@intercertlatam.com
            `
        },
        'certificate_verification': {
            title: 'Verificación de Certificado',
            content: `
Esta consulta quedará registrada en nuestros sistemas de auditoría conforme a:
• ISO 17021 (Trazabilidad de certificaciones)
• ISO 27001 (Seguridad de la información)
• Ley N° 29733 (Protección de datos personales)

INFORMACIÓN REGISTRADA:
• Fecha y hora de la consulta
• Dirección IP del solicitante
• Código o número del certificado consultado

Esta información se utiliza exclusivamente para auditorías de seguridad 
y cumplimiento normativo.
            `
        }
    };

    const currentConsent = consentTexts[consentType] || consentTexts.form_submission;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '12px',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #0A165E, #159dbc)',
                    color: 'white',
                    padding: '24px',
                    borderRadius: '12px 12px 0 0'
                }}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
                        <i className="ri-shield-check-line" style={{ marginRight: '10px' }}></i>
                        {currentConsent.title}
                    </h3>
                </div>

                <div style={{
                    padding: '24px',
                    maxHeight: '50vh',
                    overflowY: 'auto'
                }}>
                    <div style={{
                        whiteSpace: 'pre-line',
                        lineHeight: '1.6',
                        color: '#374151',
                        fontSize: '0.95rem'
                    }}>
                        {currentConsent.content}
                    </div>

                    <div style={{
                        marginTop: '24px',
                        padding: '16px',
                        background: '#f3f4f6',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                    }}>
                        <input
                            type="checkbox"
                            id="consent-checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                marginTop: '2px'
                            }}
                        />
                        <label
                            htmlFor="consent-checkbox"
                            style={{
                                flex: 1,
                                cursor: 'pointer',
                                color: '#1f2937',
                                fontSize: '0.95rem',
                                fontWeight: '500'
                            }}
                        >
                            He leído y acepto el tratamiento de mis datos personales conforme
                            a lo establecido en la Ley N° 29733 y autorizo a INTERCERT LATAM
                            para los fines descritos.
                        </label>
                    </div>
                </div>

                <div style={{
                    padding: '20px 24px',
                    borderTop: '1px solid #e5e7eb',
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onDecline}
                        style={{
                            padding: '12px 24px',
                            background: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            color: '#374151',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleAccept}
                        disabled={!acceptedTerms}
                        style={{
                            padding: '12px 32px',
                            background: acceptedTerms ? '#159dbc' : '#d1d5db',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: acceptedTerms ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s',
                            opacity: acceptedTerms ? 1 : 0.6
                        }}
                        onMouseEnter={(e) => {
                            if (acceptedTerms) e.currentTarget.style.background = '#127a93';
                        }}
                        onMouseLeave={(e) => {
                            if (acceptedTerms) e.currentTarget.style.background = '#159dbc';
                        }}
                    >
                        <i className="ri-check-line" style={{ marginRight: '8px' }}></i>
                        Aceptar y Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataConsentModal;
