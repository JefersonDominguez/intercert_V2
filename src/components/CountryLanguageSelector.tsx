import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { COUNTRIES_LIST, getCurrentCountry } from '../config/countries';
import type { CountryConfig as Country } from '../types/config';

const CountryLanguageSelector: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [currentCountry, setCurrentCountry] = useState<Country>(getCurrentCountry());

    // Actualizar país actual cuando cambia la ruta
    useEffect(() => {
        setCurrentCountry(getCurrentCountry());
    }, [location.pathname]);

    // Cerrar modal al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest('.country-selector-modal') && !target.closest('.country-selector-btn')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevenir scroll del body cuando el modal está abierto
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleCountrySelect = (country: Country) => {
        const currentPath = location.pathname || '/';
        const currentSearch = location.search || '';
        const currentHash = location.hash || '';

        const currentCountry = getCurrentCountry();
        let normalizedPath = currentPath;

        if (currentCountry.code !== 'global' && currentPath.startsWith(`/${currentCountry.code}`)) {
            normalizedPath = currentPath.replace(`/${currentCountry.code}`, '') || '/';
        }

        const ensureLeadingSlash = (path: string) => (path.startsWith('/') ? path : `/${path}`);

        let targetPath;
        if (country.code === 'global') {
            targetPath = normalizedPath === '/' ? '/home' : normalizedPath;
        } else {
            const suffix = normalizedPath === '/' ? '' : ensureLeadingSlash(normalizedPath);
            targetPath = `/${country.code}${suffix}`;
        }

        navigate(`${targetPath}${currentSearch}${currentHash}`);
        setIsOpen(false);
    };

    // Función para obtener la ruta del logo de un país
    const getCountryLogo = (countryCode: string): string | null => {
        // Mapeo individual explícito para cada país
        if (countryCode === 'global') {
            return '/assets/images/logos/logo-paises/latam.png';
        } else if (countryCode === 'pe') {
            return '/assets/images/logos/logo-paises/per.png';
        } else if (countryCode === 'co') {
            return '/assets/images/logos/logo-paises/colombia.png';
        } else if (countryCode === 'ec') {
            return '/assets/images/logos/logo-paises/ecuador.png';
        } else if (countryCode === 'mx') {
            return '/assets/images/logos/logo-paises/mexico.png';
        } else if (countryCode === 'pa') {
            return '/assets/images/logos/logo-paises/panama.png';
        } else if (countryCode === 'cr') {
            return '/assets/images/logos/logo-paises/costa%20rica.png';
        } else if (countryCode === 'es') {
            return '/assets/images/logos/logo-paises/espana.png';
        }
        return null;
    };

    // Función para obtener el indicador visual del país (imagen o texto)
    const getCountryIndicator = (country: Country, size: 'small' | 'large' = 'small') => {
        const logoPath = getCountryLogo(country.code);
        const imageSize = size === 'small' ? { width: '20px', height: '20px' } : { width: '40px', height: '40px' };

        // Generar las iniciales del país para usar como fallback
        const initials = country.name
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);

        const textIndicator = (
            <div
                className="country-text-indicator"
                style={{
                    ...imageSize,
                    backgroundColor: '#159dbc',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'none', // Inicialmente oculto, se muestra solo si la imagen falla
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: size === 'small' ? '9px' : '14px',
                    fontWeight: '600',
                    flexShrink: 0
                }}
            >
                {initials}
            </div>
        );

        if (logoPath) {
            return (
                <>
                    <img
                        src={logoPath}
                        alt={`Logo ${country.name}`}
                        style={{
                            ...imageSize,
                            objectFit: 'contain',
                            flexShrink: 0
                        }}
                        onError={(e) => {
                            // Si la imagen falla al cargar, mostrar el indicador de texto
                            const target = e.target as HTMLImageElement;
                            const parent = target.parentElement;
                            if (parent) {
                                target.style.display = 'none';
                                const textIndicator = parent.querySelector('.country-text-indicator') as HTMLElement;
                                if (textIndicator) {
                                    textIndicator.style.display = 'flex';
                                }
                            }
                        }}
                    />
                    {textIndicator}
                </>
            );
        }

        // Si no hay imagen disponible, mostrar directamente el indicador de texto
        return (
            <div
                className="country-text-indicator"
                style={{
                    ...imageSize,
                    backgroundColor: '#159dbc',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: size === 'small' ? '9px' : '14px',
                    fontWeight: '600',
                    flexShrink: 0
                }}
            >
                {initials}
            </div>
        );
    };

    // Ordenar países alfabéticamente
    const sortedCountries = [...COUNTRIES_LIST].sort((a, b) =>
        a.name.localeCompare(b.name, 'es')
    );

    return (
        <>
            {/* Botón para abrir el selector */}
            <button
                className="country-selector-btn"
                type="button"
                onClick={() => setIsOpen(true)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'transparent',
                    border: 'none',
                    color: '#585B6F',
                    cursor: 'pointer',
                    padding: '5px 10px',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.color = '#159dbc';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.color = '#585B6F';
                }}
            >
                {/* Logo del país actual */}
                <div style={{ position: 'relative' }}>
                    {getCountryIndicator(currentCountry, 'small')}
                </div>
                <span style={{ fontWeight: '500' }}>{currentCountry.name}</span>
            </button>

            {/* Modal/Overlay - Renderizado con Portal en el body */}
            {isOpen && ReactDOM.createPortal(
                <>
                    {/* Backdrop */}
                    <div
                        className="country-selector-backdrop"
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            zIndex: 999999,
                            animation: 'fadeIn 0.3s ease',
                            display: 'block',
                            visibility: 'visible',
                            opacity: 1
                        }}
                    />

                    {/* Modal */}
                    <div
                        className="country-selector-modal"
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: '#FFFFFF',
                            borderRadius: '0',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                            zIndex: 1000000,
                            maxWidth: '1100px',
                            width: '90%',
                            maxHeight: '85vh',
                            overflow: 'auto',
                            animation: 'slideUp 0.3s ease',
                            display: 'block',
                            visibility: 'visible',
                            opacity: 1,
                            pointerEvents: 'auto'
                        }}
                    >
                        {/* Header minimalista */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '24px 40px',
                            borderBottom: '1px solid #E5E7EB'
                        }}>
                            <div style={{
                                fontSize: '14px',
                                color: '#374151',
                                fontWeight: '400'
                            }}>
                                <span style={{ fontWeight: '600' }}>Ubicación</span>
                                <span style={{ margin: '0 8px', color: '#9CA3AF' }}>:</span>
                                <span style={{ fontWeight: '600' }}>{currentCountry.name}</span>
                                <span style={{ margin: '0 8px', color: '#9CA3AF' }}>•</span>
                                <span>Español</span>
                            </div>

                            {/* Botón X minimalista */}
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '32px',
                                    height: '32px',
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    transition: 'opacity 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.opacity = '0.6';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 30 30"
                                    width="28"
                                    height="28"
                                >
                                    <path
                                        fill="#6B7280"
                                        d="M6.386 3.803a1.007 1.007 0 0 0-1.44 0l-.727.741a1.03 1.03 0 0 0 0 1.441l8.628 8.798-9.054 9.232a1.03 1.03 0 0 0 0 1.44l.727.742a1.007 1.007 0 0 0 1.44 0L15 16.979l9.04 9.218a1.007 1.007 0 0 0 1.44 0l.727-.741a1.03 1.03 0 0 0 0-1.441l-9.054-9.232 8.628-8.798a1.03 1.03 0 0 0 0-1.44l-.726-.742a1.007 1.007 0 0 0-1.44 0L15 12.587z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Lista de países en columnas */}
                        <div style={{
                            padding: '30px 40px 40px',
                            maxHeight: 'calc(85vh - 80px)',
                            overflowY: 'auto'
                        }}>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '24px 32px',
                                columnGap: '48px'
                            }}>
                                {sortedCountries.map((country) => {
                                    return (
                                        <li key={country.code}>
                                            <button
                                                onClick={() => handleCountrySelect(country)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    transition: 'opacity 0.2s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.opacity = '0.7';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.opacity = '1';
                                                }}
                                            >
                                                {/* Logo del país */}
                                                <div style={{ position: 'relative' }}>
                                                    {getCountryIndicator(country, 'large')}
                                                </div>

                                                {/* Contenedor de texto */}
                                                <div style={{ flex: 1 }}>
                                                    {/* Nombre del país */}
                                                    <div style={{
                                                        fontSize: '15px',
                                                        fontWeight: '700',
                                                        color: '#111827',
                                                        marginBottom: '4px',
                                                        textDecoration: currentCountry.code === country.code ? 'underline' : 'none'
                                                    }}>
                                                        {country.name}
                                                    </div>

                                                    {/* Idiomas */}
                                                    <div style={{
                                                        fontSize: '13px',
                                                        color: '#6B7280',
                                                        fontWeight: '400'
                                                    }}>
                                                        {country.languages.join(' • ')}
                                                    </div>
                                                </div>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </>,
                document.body
            )}

            {/* Estilos y animaciones */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        /* Scrollbar minimalista */
        .country-selector-modal > div:last-child::-webkit-scrollbar {
          width: 6px;
        }

        .country-selector-modal > div:last-child::-webkit-scrollbar-track {
          background: transparent;
        }

        .country-selector-modal > div:last-child::-webkit-scrollbar-thumb {
          background: #D1D5DB;
          border-radius: 3px;
        }

        .country-selector-modal > div:last-child::-webkit-scrollbar-thumb:hover {
          background: #9CA3AF;
        }
      `}</style>
        </>
    );
};

export default CountryLanguageSelector;
