import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentCountry, COUNTRIES } from '../../config/countries';
import { useBuildCountryUrl } from '../../hooks/useBuildCountryUrl';

const SEARCH_ITEMS = [
    { title: 'Inicio', path: '/home', keywords: ['home', 'principal', 'intercert', 'bienvenida'] },
    // { title: 'Partners', path: '/about-partners', keywords: ['socios', 'aliados', 'colaboradores'] },
    { title: 'Nosotros', path: '/about', keywords: ['empresa', 'historia', 'quienes somos', 'misión', 'visión'] },
    { title: 'Certificaciones ISO', path: '/certificacion-iso', keywords: ['iso', '9001', '14001', '45001', '37001', '27001', '22000', '50001', 'calidad', 'gestión', 'normas', 'estándares'] },
    { title: 'Certificación de Personas', path: '/certificacion-personas', keywords: ['personas', 'profesionales', 'competencias', 'auditores', 'cursos'] },
    { title: 'Sector Educativo', path: '/sector/educativo', keywords: ['educación', 'colegios', 'universidades', '21001', 'enseñanza'] },
    { title: 'Sector Pesca', path: '/sector/pesca', keywords: ['pesca', 'marítimo', 'alimentos', 'sostenibilidad'] },
    { title: 'Sector Construcción', path: '/sector/construccion', keywords: ['construcción', 'obras', 'infraestructura', 'seguridad', 'calidad'] },
    { title: 'Sector Salud', path: '/sector/salud', keywords: ['salud', 'hospitales', 'clínicas', 'pacientes', 'sanidad'] },
    { title: 'Sector Alimentos y Bebidas', path: '/sector/alimentos-bebidas', keywords: ['alimentos', 'bebidas', 'haccp', '22000', 'inocuidad'] },
    { title: 'Sector Agroexportación', path: '/sector/agroexportacion', keywords: ['agro', 'exportación', 'campo', 'frutas', 'verduras', 'globalgap'] },
    { title: 'Soluciones Sostenibles', path: '/sector/soluciones-sostenibles', keywords: ['sostenibilidad', 'ambiente', 'verde', 'carbono', 'huella'] },
    { title: 'Tecnologías de la Información', path: '/sector/tecnologias-informacion', keywords: ['ti', 'tecnología', 'software', '27001', 'seguridad', 'ciberseguridad', 'datos'] },
    { title: 'Contacto', path: '/contact', keywords: ['teléfono', 'email', 'dirección', 'ubicación', 'mensaje', 'soporte'] },
    { title: 'Verificar Certificado', path: '/verify-certificate', keywords: ['verificar', 'validar', 'certificado', 'autenticidad', 'código'] },
    { title: 'Iniciar Sesión', path: 'https://portal.intercertlatam.com/', keywords: ['login', 'ingresar', 'acceder', 'cuenta', 'usuario'] },
];

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { buildUrl, isActivePath } = useBuildCountryUrl();

    // Search Logic
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ title: string; path: string; keywords?: string[] }[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            const filtered = SEARCH_ITEMS.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.keywords?.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchResultClick = (path: string) => {
        setIsMenuOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        if (path.startsWith('http')) {
            window.location.href = path;
        } else {
            navigate(buildUrl(path));
        }
    };

    // Get current country for contact info (logo, teléfono, etc.)
    const currentCountry = getCurrentCountry(location.pathname);

    return (
        <header className="tv-header-height">

            {/* Main Header */}
            <div id="main-header-area" className="tv-header-area header-style-1 tv-header-ptb p-relative" style={{ zIndex: 1000 }}>
                <div className="tv-header-logo-fixed">
                    <Link to={buildUrl('/home')}>
                        <img src={currentCountry.logo} alt={`INTERCERT ${currentCountry.name}`} className="header-logo-img" />
                    </Link>
                </div>

                <div className="container container-1750">
                    <div className="p-relative">
                        <div className="row align-items-center">
                            <div className="col-6 d-xl-none">
                                <div className="tv-header-logo tv-header-logo-mobile">
                                    <Link to={buildUrl('/home')}>
                                        <img src={currentCountry.logo} alt={`INTERCERT ${currentCountry.name}`} className="header-logo-img" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xxl-7 col-xl-7 d-none d-xl-block">
                                <div className="tv-header-menu tv-header-dropdown">
                                    <nav className="tv-menu-content">
                                        <ul style={{ marginLeft: '150px', whiteSpace: 'nowrap', flexWrap: 'nowrap' }}>
                                            {/* <li className={location.pathname === '/about-partners' ? 'active' : ''}>
                                                <Link to={buildUrl('/about-partners')}>Partners</Link>
                                            </li> */}
                                            <li className={location.pathname === '/about' ? 'active' : ''}>
                                                <Link to={buildUrl('/about')}>Nosotros</Link>
                                            </li>
                                            <li className={`has-dropdown ${location.pathname.startsWith('/services') ? 'active' : ''}`}>
                                                <a href="#" onClick={(e) => e.preventDefault()}>Servicios <i className="ri-arrow-down-s-line"></i></a>
                                                <ul className="tv-submenu submenu">
                                                    <li><Link to={buildUrl('/certificacion-iso')}>Certificaciones ISO</Link></li>
                                                    <li><Link to={buildUrl('/certificacion-personas')}>Certificación de Personas</Link></li>
                                                </ul>
                                            </li>
                                            <li className={`has-dropdown ${location.pathname.startsWith('/sector') ? 'active' : ''}`}>
                                                <a href="#" onClick={(e) => e.preventDefault()}>Sectores <i className="ri-arrow-down-s-line"></i></a>
                                                <ul className="tv-submenu submenu">
                                                    <li><Link to={buildUrl('/sector/educativo')}>Educativo</Link></li>
                                                    <li><Link to={buildUrl('/sector/pesca')}>Pesca</Link></li>
                                                    <li><Link to={buildUrl('/sector/construccion')}>Construcción</Link></li>
                                                    <li><Link to={buildUrl('/sector/salud')}>Salud</Link></li>
                                                    <li><Link to={buildUrl('/sector/alimentos-bebidas')}>Alimentos y Bebidas</Link></li>
                                                    <li><Link to={buildUrl('/sector/agroexportacion')}>Agroexportación</Link></li>
                                                    <li><Link to={buildUrl('/sector/soluciones-sostenibles')}>Soluciones Sostenibles</Link></li>
                                                    <li><Link to={buildUrl('/sector/tecnologias-informacion')}>Tecnologías de la Información</Link></li>
                                                </ul>
                                            </li>
                                            <li className={isActivePath('/contact') ? 'active' : ''}>
                                                <Link to={buildUrl('/contact')}>Contacto</Link>
                                            </li>
                                            {/* Verificar Certificado solo visible en menú móvil */}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-xxl-5 col-xl-5 col-6 col-md-12">
                                <div className="tv-header-right-action d-flex justify-content-end align-items-center">


                                    {/* User Profile Dropdown */}
                                    <div style={{ position: 'relative', marginRight: '8px' }} className="d-flex align-items-center">
                                            <button
                                                className="tv-header-search"
                                                aria-label="Iniciar Sesión"
                                                onClick={() => window.location.href = 'https://portal.intercertlatam.com/'}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '0',
                                                    background: '#D9D9D9',
                                                    border: '1px solid #E2E8F0',
                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    width: '45px',
                                                    height: '45px',
                                                    borderRadius: '50%',
                                                    marginRight: '0'
                                                }}
                                            >
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
                                                    background: '#fff',
                                                    color: '#159dbc',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '20px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <i className="ri-user-line"></i>
                                                </div>
                                            </button>
                                    </div>
                                    {/* Country Selector Dropdown */}
                                    <div style={{ position: 'relative', marginRight: '8px' }} className="d-flex align-items-center">
                                        <button
                                            className="tv-header-search"
                                            aria-label={`Seleccionar país - ${currentCountry.name}`}
                                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                padding: '0 10px',
                                                position: 'relative',
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {(() => {
                                                let logoSrc = null;
                                                if (currentCountry.code === 'global') {
                                                    logoSrc = '/assets/images/logos/logo-paises/latam.png';
                                                } else if (currentCountry.code === 'pe') {
                                                    logoSrc = '/assets/images/logos/logo-paises/per.png';
                                                } else if (currentCountry.code === 'co') {
                                                    logoSrc = '/assets/images/logos/logo-paises/colombia.png';
                                                } else if (currentCountry.code === 'ec') {
                                                    logoSrc = '/assets/images/logos/logo-paises/ecuador.png';
                                                } else if (currentCountry.code === 'mx') {
                                                    logoSrc = '/assets/images/logos/logo-paises/mexico.png';
                                                } else if (currentCountry.code === 'pa') {
                                                    logoSrc = '/assets/images/logos/logo-paises/panama.png';
                                                } else if (currentCountry.code === 'cr') {
                                                    logoSrc = '/assets/images/logos/logo-paises/costa%20rica.png';
                                                } else if (currentCountry.code === 'es') {
                                                    logoSrc = '/assets/images/logos/logo-paises/espana.png';
                                                }

                                                const getCountryInitials = (countryName: string) => {
                                                    return countryName
                                                        .split(' ')
                                                        .map(word => word.charAt(0).toUpperCase())
                                                        .join('')
                                                        .substring(0, 2);
                                                };

                                                return logoSrc ? (
                                                    <img
                                                        src={logoSrc}
                                                        alt={currentCountry.name}
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            objectFit: 'contain',
                                                            borderRadius: '4px'
                                                        }}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                            const parent = (e.target as HTMLImageElement).parentElement;
                                                            if (parent) {
                                                                const fallback = document.createElement('div');
                                                                fallback.style.cssText = 'width: 32px; height: 32px; background-color: #159dbc; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;';
                                                                fallback.textContent = getCountryInitials(currentCountry.name);
                                                                parent.appendChild(fallback);
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            backgroundColor: '#159dbc',
                                                            color: 'white',
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '13px',
                                                            fontWeight: '600'
                                                        }}
                                                    >
                                                        {getCountryInitials(currentCountry.name)}
                                                    </div>
                                                );
                                            })()}
                                            <i className={`ri-arrow-${isCountryDropdownOpen ? 'up' : 'down'}-s-line`} style={{ fontSize: '14px' }}></i>
                                        </button>

                                        {/* Dropdown Panel */}
                                        {isCountryDropdownOpen && (
                                            <>
                                                <div
                                                    style={{
                                                        position: 'fixed',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        zIndex: 9998
                                                    }}
                                                    onClick={() => setIsCountryDropdownOpen(false)}
                                                />
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 'calc(100% + 12px)',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        background: '#FFFFFF',
                                                        borderRadius: '12px',
                                                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                                                        padding: '16px',
                                                        minWidth: '300px',
                                                        maxWidth: 'calc(100vw - 20px)',
                                                        zIndex: 9999,
                                                        border: '1px solid #E2E8F0'
                                                    }}
                                                >
                                                    <div style={{
                                                        fontSize: '14px',
                                                        fontWeight: '600',
                                                        color: '#2D3748',
                                                        marginBottom: '12px'
                                                    }}>
                                                        Seleccione su ubicación
                                                    </div>

                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                                        gap: '8px'
                                                    }}>
                                                        {Object.entries(COUNTRIES).map(([code, country]) => {
                                                            let logoSrc = null;

                                                            if (country.code === 'global') {
                                                                logoSrc = '/assets/images/logos/logo-paises/latam.png';
                                                            } else if (country.code === 'pe') {
                                                                logoSrc = '/assets/images/logos/logo-paises/per.png';
                                                            } else if (country.code === 'co') {
                                                                logoSrc = '/assets/images/logos/logo-paises/colombia.png';
                                                            } else if (country.code === 'ec') {
                                                                logoSrc = '/assets/images/logos/logo-paises/ecuador.png';
                                                            } else if (country.code === 'mx') {
                                                                logoSrc = '/assets/images/logos/logo-paises/mexico.png';
                                                            } else if (country.code === 'pa') {
                                                                logoSrc = '/assets/images/logos/logo-paises/panama.png';
                                                            } else if (country.code === 'cr') {
                                                                logoSrc = '/assets/images/logos/logo-paises/costa%20rica.png';
                                                            } else if (country.code === 'es') {
                                                                logoSrc = '/assets/images/logos/logo-paises/espana.png';
                                                            }

                                                            const getCountryInitials = (countryName: string) => {
                                                                return countryName
                                                                    .split(' ')
                                                                    .map(word => word.charAt(0).toUpperCase())
                                                                    .join('')
                                                                    .substring(0, 2);
                                                            };

                                                            const targetPath = country.code === 'global' ? '/home' : `/${country.code}`;
                                                            const isCurrentCountry = currentCountry.code === country.code;

                                                            const handleCountryClick = (e: React.MouseEvent) => {
                                                                e.preventDefault();
                                                                setIsCountryDropdownOpen(false);
                                                                navigate(targetPath);
                                                            };

                                                            return (
                                                                <button
                                                                    key={code}
                                                                    onClick={handleCountryClick}
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '8px',
                                                                        padding: '8px 12px',
                                                                        background: isCurrentCountry ? '#F0F9FF' : '#FFFFFF',
                                                                        border: `1px solid ${isCurrentCountry ? '#159dbc' : '#E2E8F0'}`,
                                                                        borderRadius: '6px',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.2s',
                                                                        textAlign: 'left'
                                                                    }}
                                                                    onMouseOver={(e) => {
                                                                        if (!isCurrentCountry) {
                                                                            e.currentTarget.style.borderColor = '#CBD5E0';
                                                                            e.currentTarget.style.background = '#F7FAFC';
                                                                        }
                                                                    }}
                                                                    onMouseOut={(e) => {
                                                                        if (!isCurrentCountry) {
                                                                            e.currentTarget.style.borderColor = '#E2E8F0';
                                                                            e.currentTarget.style.background = '#FFFFFF';
                                                                        }
                                                                    }}
                                                                >
                                                                    <div style={{ position: 'relative', flexShrink: 0 }}>
                                                                        {logoSrc ? (
                                                                            <>
                                                                                <img
                                                                                    src={logoSrc}
                                                                                    alt={`Logo ${country.name}`}
                                                                                    style={{
                                                                                        width: '24px',
                                                                                        height: '24px',
                                                                                        objectFit: 'contain',
                                                                                        borderRadius: '3px',
                                                                                        display: 'block'
                                                                                    }}
                                                                                    onError={(e) => {
                                                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                                                        const fallback = (e.target as HTMLImageElement).parentElement?.querySelector('.country-fallback') as HTMLElement;
                                                                                        if (fallback) {
                                                                                            fallback.style.display = 'flex';
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <div
                                                                                    className="country-fallback"
                                                                                    style={{
                                                                                        width: '24px',
                                                                                        height: '24px',
                                                                                        backgroundColor: '#159dbc',
                                                                                        color: 'white',
                                                                                        borderRadius: '50%',
                                                                                        display: 'none',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        fontSize: '12px',
                                                                                        fontWeight: '600'
                                                                                    }}
                                                                                >
                                                                                    {getCountryInitials(country.name)}
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <div
                                                                                style={{
                                                                                    width: '24px',
                                                                                    height: '24px',
                                                                                    backgroundColor: '#159dbc',
                                                                                    color: 'white',
                                                                                    borderRadius: '50%',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    fontSize: '12px',
                                                                                    fontWeight: '600'
                                                                                }}
                                                                            >
                                                                                {getCountryInitials(country.name)}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div style={{ flex: 1 }}>
                                                                        <div style={{
                                                                            fontSize: '13px',
                                                                            fontWeight: '600',
                                                                            color: isCurrentCountry ? '#159dbc' : '#2D3748',
                                                                            marginBottom: '1px'
                                                                        }}>
                                                                            {country.name === 'Latam' ? 'Latam' : country.name}
                                                                        </div>
                                                                        <div style={{
                                                                            fontSize: '11px',
                                                                            color: '#718096'
                                                                        }}>
                                                                            Español
                                                                        </div>
                                                                    </div>
                                                                    {isCurrentCountry && (
                                                                        <i className="ri-check-line" style={{ fontSize: '16px', color: '#159dbc' }}></i>
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Verify Certificate */}
                                    <Link className="tv-btn-primary d-none d-md-block verify-cert-btn" to="/verify-certificate" style={{ backgroundColor: '#0A165E', borderColor: '#0A165E', marginRight: '10px' }}>
                                        <span className="btn-wrap" style={{ textAlign: 'center' }}>
                                            <span className="btn-text1">Verificar Certificado</span>
                                            <span className="btn-text2">Verificar Certificado</span>
                                        </span>
                                    </Link>
                                    <div className="tv-header-bar" onClick={() => setIsMenuOpen(true)}>
                                        <button className="tv-menu-bar">
                                            <span><i className="ri-menu-line"></i></span>
                                        </button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`itoffcanvas ${isMenuOpen ? 'opened' : ''}`}>
                <div className="itoffcanvas__close-btn">
                    <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <div className="itoffcanvas__logo">
                    <Link to={buildUrl('/home')} onClick={() => setIsMenuOpen(false)}>
                        <img src={currentCountry.logo} alt={`INTERCERT ${currentCountry.name}`} />
                    </Link>
                </div>

                {/* Search Button */}
                <div className="itoffcanvas__search-section" style={{
                    padding: '20px 30px',
                    borderBottom: '1px solid #3b3838',
                    marginBottom: '20px'
                }}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const firstResult = searchResults?.[0];
                            if (firstResult?.path) {
                                handleSearchResultClick(firstResult.path);
                            }
                        }}
                        style={{ position: 'relative' }}
                    >
                        <i
                            className="ri-search-line"
                            style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '18px',
                                color: '#ffffff',
                                pointerEvents: 'none',
                                zIndex: 1
                            }}
                        ></i>
                        <input
                            type="text"
                            name="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Buscar..."
                            autoComplete="off"
                            style={{
                                width: '100%',
                                padding: '12px 16px 12px 44px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '8px',
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: '400',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                                (e.target as HTMLInputElement).style.background = 'rgba(255, 255, 255, 0.15)';
                                (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.3)';
                            }}
                            onBlur={(e) => {
                                (e.target as HTMLInputElement).style.background = 'rgba(255, 255, 255, 0.1)';
                                (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            }}
                        />
                        <style>
                            {`
                                input[name="search"]::placeholder {
                                    color: rgba(255, 255, 255, 0.7) !important;
                                }
                            `}
                        </style>

                        {/* Search Results */}
                        {searchResults.length > 0 && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                marginTop: '8px',
                                background: '#FFFFFF',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                zIndex: 10
                            }}>
                                {searchResults.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearchResultClick(item.path)}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '12px 16px',
                                            border: 'none',
                                            background: 'transparent',
                                            borderBottom: index < searchResults.length - 1 ? '1px solid #E2E8F0' : 'none',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            color: '#2D3748',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = '#F7FAFC'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </form>
                </div>

                {/* Verificar Certificado Button */}
                <div style={{ padding: '20px 30px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '20px' }}>
                    <Link
                        to={buildUrl('/verify-certificate')}
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            display: 'flex',
                            width: '100%',
                            padding: '14px 20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: '15px',
                            fontWeight: '500',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                    >
                        <i className="ri-shield-check-line" style={{ fontSize: '18px' }}></i>
                        <span>Verificar tu Certificado</span>
                    </Link>
                </div>

                <div className="itoffcanvas__text">
                    <p>En Intercert, nos especializamos en brindar servicios de certificación ISO de la más alta calidad, adaptados a las necesidades específicas de cada sector empresarial en Latinoamérica.</p>
                </div>

                <div className="tv-menu-mobile d-xl-none">
                    <nav className="tv-menu-content">
                        <ul>
                            {/* <li>
                                <Link to={buildUrl('/about-partners')} onClick={() => setIsMenuOpen(false)}>Partners</Link>
                            </li> */}
                            <li>
                                <Link to={buildUrl('/about')} onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
                            </li>
                            <li className="has-dropdown">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    Servicios
                                    <button className="dropdown-toggle-btn">
                                        <i className="ri-arrow-right-s-line"></i>
                                    </button>
                                </a>
                                <ul className="tv-submenu submenu">
                                    <li><Link to={buildUrl('/certificacion-iso')} onClick={() => setIsMenuOpen(false)}>Certificaciones ISO</Link></li>
                                    <li><Link to={buildUrl('/certificacion-personas')} onClick={() => setIsMenuOpen(false)}>Certificación de Personas</Link></li>
                                </ul>
                            </li>
                            <li className="has-dropdown">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    Sectores
                                    <button className="dropdown-toggle-btn">
                                        <i className="ri-arrow-right-s-line"></i>
                                    </button>
                                </a>
                                <ul className="tv-submenu submenu">
                                    <li><Link to={buildUrl('/sector/educativo')} onClick={() => setIsMenuOpen(false)}>Educativo</Link></li>
                                    <li><Link to={buildUrl('/sector/pesca')} onClick={() => setIsMenuOpen(false)}>Pesca</Link></li>
                                    <li><Link to={buildUrl('/sector/construccion')} onClick={() => setIsMenuOpen(false)}>Construcción</Link></li>
                                    <li><Link to={buildUrl('/sector/salud')} onClick={() => setIsMenuOpen(false)}>Salud</Link></li>
                                    <li><Link to={buildUrl('/sector/alimentos-bebidas')} onClick={() => setIsMenuOpen(false)}>Alimentos y Bebidas</Link></li>
                                    <li><Link to={buildUrl('/sector/agroexportacion')} onClick={() => setIsMenuOpen(false)}>Agroexportación</Link></li>
                                    <li><Link to={buildUrl('/sector/soluciones-sostenibles')} onClick={() => setIsMenuOpen(false)}>Soluciones Sostenibles</Link></li>
                                    <li><Link to={buildUrl('/sector/tecnologias-informacion')} onClick={() => setIsMenuOpen(false)}>Tecnologías de la Información</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to={buildUrl('/contact')} onClick={() => setIsMenuOpen(false)}>Contacto</Link>
                            </li>
                            <li>
                                <Link to="/verify-certificate" onClick={() => setIsMenuOpen(false)}>Verificar Certificado</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="itoffcanvas__info">
                    <h3 className="offcanva-title">Ponte en Contacto</h3>
                    <div className="tv-info-wrapper mb-20 d-flex align-items-center">
                        <div className="itoffcanvas__info-icon">
                            <a href={`mailto:${currentCountry.email}`}>
                                <i className="ri-mail-line"></i>
                            </a>
                        </div>
                        <div className="itoffcanvas__info-address">
                            <span>Email</span>
                            <a href={`mailto:${currentCountry.email}`}>{currentCountry.email}</a>
                        </div>
                    </div>
                    <div className="tv-info-wrapper mb-20 d-flex align-items-center">
                        <div className="itoffcanvas__info-icon">
                            <a href={`tel:${currentCountry.phone.replace(/\s/g, '')}`}>
                                <i className="ri-phone-line"></i>
                            </a>
                        </div>
                        <div className="itoffcanvas__info-address">
                            <span>Teléfono</span>
                            <a href={`tel:${currentCountry.phone.replace(/[^\d]/g, '')}`}>{currentCountry.phone}</a>
                        </div>
                    </div>
                    {currentCountry.address && (
                        <div className="tv-info-wrapper mb-20 d-flex align-items-center">
                            <div className="itoffcanvas__info-icon">
                                <a href={currentCountry.mapUrl || 'https://www.google.com/maps'} target="_blank" rel="noopener noreferrer">
                                    <i className="ri-map-pin-line"></i>
                                </a>
                            </div>
                            <div className="itoffcanvas__info-address">
                                <span>Ubicación</span>
                                <a href={currentCountry.mapUrl || 'https://www.google.com/maps'} target="_blank" rel="noopener noreferrer">
                                    {currentCountry.address}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div >

            {/* Body Overlay */}
            {isMenuOpen && <div className="body-overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </header >
    );
};

export default Header;
