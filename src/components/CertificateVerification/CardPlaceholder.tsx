import React from 'react';

const CardPlaceholder: React.FC = () => {
    const logos = [
        'logo-adani.webp',
        'logo-aegis.webp',
        'logo-asu.webp',
        'logo-ayq.webp',
        'logo-coca_cola.webp',
        'logo-ericsson.webp',
        'logo-ffl.webp',
        'logo-gnt.webp',
        'logo-imaq_peru.webp',
        'logo-imas.webp',
        'logo-inen.webp',
        'logo-izuzu.webp',
        'logo-kia.webp',
        'logo-lat.webp',
        'logo-peru_compras.webp',
        'logo-subaru.webp'
    ];

    return (
        <div className="search-results-placeholder">
            <div className="text-center py-5 px-3">
                <h4 className="mb-4" style={{
                    color: 'var(--tv-theme-1)',
                    fontWeight: '600',
                    fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                    lineHeight: '1.3'
                }}>
                    Empresas que confían en nosotros
                </h4>

                {/* Logo Carousel */}
                <div className="logo-carousel-container">
                    <div className="logo-carousel">
                        {logos.map((logo, index) => (
                            <div key={index} className="logo-item">
                                <img
                                    src={`/assets/images/logos/${logo}`}
                                    alt={`Logo ${index + 1}`}
                                    className="logo-image"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                        {/* Duplicate logos for seamless loop */}
                        {logos.map((logo, index) => (
                            <div key={`duplicate-${index}`} className="logo-item">
                                <img
                                    src={`/assets/images/logos/${logo}`}
                                    alt={`Logo ${index + 1}`}
                                    className="logo-image"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPlaceholder;
