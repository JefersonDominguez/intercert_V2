import React, { useState } from 'react';
import type { CertificationDisplayData } from '@/types/certification';

const CertificationFoundDisplay: React.FC<CertificationDisplayData> = ({
    companyAddress,
    companyName,
    initialDate,
    isoCode,
    issueDate,
    recertificationDate,
    registrationNumber,
    scope,
    status,
    validDate
}) => {
    const [showFullScope, setShowFullScope] = useState(false);

    const formatDate = (date: string | undefined) => {
        if (!date) return 'N/A';
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    };

    const sliceText = (text: string, wordLimit = 20) => {
        return text.split(' ').slice(0, wordLimit).join(' ') + (text.split(' ').length > wordLimit ? '...' : '');
    };

    const isLongScope = scope && scope.length >= 202;

    return (
        <div className="space-y-6">
            {/* Header con nombre de empresa y estado */}
            <div className="mb-4">
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-3">
                    <h3 className="h4 mb-0">{companyName}</h3>
                    <div className={`d-flex align-items-center px-3 py-2 rounded-pill border ${status === 'VALID'
                        ? 'bg-success bg-opacity-10 border-success text-success'
                        : 'bg-danger bg-opacity-10 border-danger text-danger'
                        }`}>
                        <i className={`ri-${status === 'VALID' ? 'check' : 'close'}-circle-fill me-2`}></i>
                        <span className="fw-medium">{status === 'VALID' ? 'Válido' : 'Inválido'}</span>
                    </div>
                </div>
                <p className="text-muted mb-0">
                    Número de Registro #{registrationNumber}
                </p>
            </div>

            {/* Información de la empresa */}
            <div className="mb-4">
                <CertificateField
                    icon="ri-building-line"
                    label="Dirección Empresa"
                    value={companyAddress}
                />

                <div className="row g-4 mt-3">
                    <div className="col-md-6">
                        <CertificateField
                            icon="ri-award-line"
                            label="Norma ISO"
                            value={isoCode}
                        />
                    </div>
                    <div className="col-md-6">
                        <CertificateField
                            icon="ri-file-text-line"
                            label="Alcance del Certificado"
                            value={scope ? (isLongScope ? sliceText(scope) : scope) : 'N/A'}
                        />
                        {isLongScope && (
                            <div className="text-center mt-2">
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => setShowFullScope(true)}
                                    style={{
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Ver más
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fechas del certificado */}
            <div className="pt-4 border-top">
                <h5 className="fw-medium mb-3">Fechas del Certificado</h5>
                <div className="row g-4">
                    <div className="col-md-6">
                        <CertificateField
                            icon="ri-calendar-line"
                            label="Fecha de Certificación Inicial"
                            value={formatDate(initialDate)}
                        />
                    </div>
                    <div className="col-md-6">
                        <CertificateField
                            icon="ri-calendar-line"
                            label="Fecha de Emisión del Certificado"
                            value={formatDate(issueDate)}
                        />
                    </div>
                    <div className="col-md-6">
                        <CertificateField
                            icon="ri-calendar-line"
                            label="Fecha de Validez del Certificado"
                            value={formatDate(validDate)}
                        />
                    </div>
                    <div className="col-md-6">
                        <CertificateField
                            icon="ri-calendar-line"
                            label="Fecha de Recertificación"
                            value={formatDate(recertificationDate)}
                        />
                    </div>
                </div>
            </div>

            {/* Modal para mostrar el alcance completo */}
            {showFullScope && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Alcance del Certificado</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowFullScope(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="p-3 border rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {scope}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowFullScope(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

interface CertificateFieldProps {
    icon: string;
    label: string;
    value?: string;
}

const CertificateField: React.FC<CertificateFieldProps> = ({ icon, label, value }) => (
    <div className="mb-3">
        <div className="d-flex align-items-center text-muted small mb-1">
            <i className={`${icon} me-2`} style={{ fontSize: '1rem' }}></i>
            <span>{label}</span>
        </div>
        <p className="mb-0 ps-4">{value || 'N/A'}</p>
    </div>
);

export default CertificationFoundDisplay;
