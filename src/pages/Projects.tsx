
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildCountryUrl } from '../config/countries';
import { allCertifications } from '../data/certifications';

const Projects = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;


    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar certificaciones
    const filteredCertifications = allCertifications.filter(cert =>
        cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular certificaciones para la página actual
    const totalPages = Math.ceil(filteredCertifications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCertifications = filteredCertifications.slice(startIndex, endIndex);

    // Función para cambiar de página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        // Manejar data-background para React
        const elements = document.querySelectorAll('[data-background]');
        elements.forEach(element => {
            const backgroundImage = element.getAttribute('data-background');
            if (backgroundImage) {
                (element as HTMLElement).style.backgroundImage = `url(${backgroundImage})`;
            }
        });
    }, []);

    return (
        <>
            {/* breadcrumb-area-start */}
            <div className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb z-index-1 fix p-relative" data-background="/assets/images/breadcrumb/certificate-background.webp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tv-breadcrumb-content z-index-1 text-center">
                                <div className="tv-breadcrumb-title-box">
                                    <h3 className="tv-breadcrumb-title tv-spltv-text tv-spltv-in-right">
                                        Nuestros Certificados ISO
                                    </h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><Link to={buildCountryUrl('/home')}>Inicio</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>Certificación ISO</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* breadcrumb-area-end */}

            <div className="tv-area-section pt-60 pb-130">
                <div className="container">
                    {/* Search Bar */}
                    <div className="row justify-content-center mb-50">
                        <div className="col-lg-8">
                            <div className="d-flex align-items-center bg-white w-100" style={{
                                borderRadius: '50px',
                                border: '2px solid #1a237e',
                                padding: '2px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                position: 'relative',
                                zIndex: 10
                            }}>
                                <div className="flex-grow-1 position-relative">
                                    <input
                                        placeholder="Buscar certificación ISO..."
                                        type="text"
                                        className="form-control border-0 shadow-none bg-transparent"
                                        style={{ fontSize: '16px', paddingLeft: '10px', color: '#495057', paddingRight: '30px' }}
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                    {searchTerm && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearchTerm('');
                                                setCurrentPage(1);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                right: '8px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                color: '#6b7280',
                                                cursor: 'pointer',
                                                fontSize: '1rem',
                                                padding: '4px',
                                                borderRadius: '4px',
                                                transition: 'all 0.2s ease',
                                                zIndex: 9
                                            }}
                                        >
                                            <i className="ri-close-line"></i>
                                        </button>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary rounded-pill px-4"
                                    style={{
                                        backgroundColor: '#0a1f61',
                                        borderColor: '#0a1f61',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingTop: '13px',
                                        paddingBottom: '13px',
                                        whiteSpace: 'nowrap',
                                        transition: 'none',
                                        marginRight: '-1px'
                                    }}
                                >
                                    <i className="ri-search-line mr-2"></i>
                                    <span>Buscar</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {currentCertifications.map((cert, index) => (
                            <div key={cert.id} className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay={`${(index + 1) * 0.2}s`}>
                                <Link to={buildCountryUrl(`/certificacion-iso/${cert.slug}`)} className="w-100">
                                    <div className="single-project-item mb-30">
                                        <img
                                            src={`/assets/images/ISOS/${cert.image}`}
                                            alt={cert.name}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <span className="icon">
                                            <i className="ri-arrow-right-line"></i>
                                        </span>
                                        <div className="single-project-content">
                                            <h3>{cert.name}</h3>
                                            <div className="project-cat">
                                                <span>{cert.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <div className="tv-pagination mt-50">
                                <nav>
                                    <ul>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <li key={page} className={currentPage === page ? 'current' : ''}>
                                                <a href="#!" onClick={(e) => { e.preventDefault(); handlePageChange(page); }}>
                                                    {page}
                                                </a>
                                            </li>
                                        ))}
                                        {currentPage < totalPages && (
                                            <li>
                                                <a href="#!" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}>
                                                    <i className="ri-arrow-right-line"></i>
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Projects;
