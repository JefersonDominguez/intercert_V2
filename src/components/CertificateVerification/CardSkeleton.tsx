import React from 'react';

const CardSkeleton: React.FC = () => {
    return (
        <div className="single-service-item gray-bg border-round wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
            <div className="service-content">
                {/* Loading header */}
                <div className="text-center mb-40">
                    <div className="skeleton-circle mb-20" style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        margin: '0 auto'
                    }}></div>
                    <div className="skeleton-line mb-10" style={{ height: '1.5rem', width: '60%', margin: '0 auto' }}></div>
                    <div className="skeleton-line" style={{ height: '1rem', width: '40%', margin: '0 auto' }}></div>
                </div>

                {/* Company header skeleton */}
                <div className="mb-30">
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-3">
                        <div className="skeleton-line" style={{ height: '2rem', width: '75%' }}></div>
                        <div className="skeleton-line" style={{ height: '1.5rem', width: '6rem' }}></div>
                    </div>
                    <div className="skeleton-line" style={{ height: '1.25rem', width: '33%' }}></div>
                </div>

                {/* Company details skeleton */}
                <div className="mb-30">
                    <div className="skeleton-line mb-3" style={{ height: '1.25rem', width: '100%' }}></div>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="single-icon-box">
                                <div className="icon mb-3">
                                    <div className="skeleton-circle" style={{ width: '2rem', height: '2rem' }}></div>
                                </div>
                                <div className="content">
                                    <div className="skeleton-line mb-2" style={{ height: '1rem', width: '6rem' }}></div>
                                    <div className="skeleton-line" style={{ height: '1.25rem', width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="single-icon-box">
                                <div className="icon mb-3">
                                    <div className="skeleton-circle" style={{ width: '2rem', height: '2rem' }}></div>
                                </div>
                                <div className="content">
                                    <div className="skeleton-line mb-2" style={{ height: '1rem', width: '6rem' }}></div>
                                    <div className="skeleton-line" style={{ height: '1.25rem', width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline skeleton */}
                <div className="pt-30 border-top">
                    <div className="skeleton-line mb-20" style={{ height: '1.5rem', width: '12rem' }}></div>
                    <div className="row g-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="col-md-6">
                                <div className="single-icon-box">
                                    <div className="icon mb-3">
                                        <div className="skeleton-circle" style={{ width: '2rem', height: '2rem' }}></div>
                                    </div>
                                    <div className="content">
                                        <div className="skeleton-line mb-2" style={{ height: '1rem', width: '9rem' }}></div>
                                        <div className="skeleton-line" style={{ height: '1.25rem', width: '8rem' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .skeleton-line, .skeleton-circle {
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: loading 1.5s infinite;
                    border-radius: 4px;
                }

                .skeleton-circle {
                    border-radius: 50% !important;
                }

                @keyframes loading {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default CardSkeleton;
