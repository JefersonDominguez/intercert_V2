import React from 'react';

const CardNotFound: React.FC = () => {
    return (
        <div className="single-service-item gray-bg border-round wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
            <div className="service-content">
                <div className="text-center mb-40">
                    <div className="service-icon mb-20">
                        <i className="ri-error-warning-line" style={{ color: '#dc3545' }}></i>
                    </div>
                    <h3 className="service-title mb-10" style={{ color: '#dc3545' }}>
                        Certificado no encontrado
                    </h3>
                    <p className="service-text mb-0">
                        No pudimos encontrar un certificado con el número de registro proporcionado.
                    </p>
                </div>

                <div className="alert alert-danger border-danger mb-30">
                    <h6 className="alert-heading d-flex align-items-center mb-3">
                        <i className="ri-search-line me-2"></i>
                        Posibles razones
                    </h6>
                    <ul className="mb-0 ps-3">
                        <li>El número de registro fue ingresado incorrectamente</li>
                        <li>El certificado aún no ha sido ingresado en nuestro sistema</li>
                    </ul>
                </div>

                <div className="next-steps pt-30 border-top">
                    <h6 className="d-flex align-items-center mb-20">
                        <i className="ri-file-text-line me-2"></i>
                        Próximos pasos
                    </h6>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="single-icon-box">
                                <div className="icon mb-3">
                                    <i className="ri-refresh-line"></i>
                                </div>
                                <div className="content">
                                    <h6 className="title mb-2">Verificar nuevamente</h6>
                                    <p className="text mb-0">
                                        Verifique nuevamente el número de registro e inténtelo de nuevo con el formato correcto.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="single-icon-box">
                                <div className="icon mb-3">
                                    <i className="ri-customer-service-line"></i>
                                </div>
                                <div className="content">
                                    <h6 className="title mb-2">Contactar soporte</h6>
                                    <p className="text mb-2">
                                        Comuníquese con el soporte al cliente para obtener ayuda:
                                    </p>
                                    <a
                                        href="mailto:support@intercertlatam.com"
                                        className="tv-btn-primary"
                                    >
                                        <i className="ri-mail-line me-1"></i>
                                        support@intercertlatam.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardNotFound;
