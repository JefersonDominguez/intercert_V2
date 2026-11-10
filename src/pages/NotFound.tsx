import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
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
            <div className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb z-index-1 fix p-relative" data-background="/assets/images/breadcrumb/breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tv-breadcrumb-content z-index-1 text-center">
                                <div className="tv-breadcrumb-title-box">
                                    <h3 className="tv-breadcrumb-title tv-spltv-text tv-spltv-in-right">404</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><Link to="/">Inicio</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>404</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* breadcrumb-area-end */}

            {/* error-area-start */}
            <div className="tv-error-area pt-130 pb-125">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-12 col-xl-7 col-lg-7 col-md-9">
                            <div className="tv-error-thumb text-center mb-120 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                                <img src="/assets/images/404/error.png" alt="Error 404" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="tv-error-content text-center">
                                <h5 className="tv-section-title pb-40 tv-spltv-text tv-spltv-in-right">
                                    Lo Sentimos, Página No Encontrada
                                </h5>
                                <div className="tv-fade-anim" data-fade-from="top" data-ease="bounce" data-delay=".5">
                                    <Link className="tv-btn-primary p-relative" to="/">
                                        <span className="btn-wrap">
                                            <span className="btn-text1">Volver al Inicio</span>
                                            <span className="btn-text2">Volver al Inicio</span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* error-area-end */}
        </>
    );
};

export default NotFound;
