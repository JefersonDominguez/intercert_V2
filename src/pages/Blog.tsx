import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildCountryUrl } from '../config/countries';
import { blogService, BlogPost } from '../services/blogService';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Blog = () => {
    const buildUrl = (path: string) => buildCountryUrl(path);

    // Estado de paginación y datos
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await blogService.getAll();
            // Filtrar solo publicados (aunque la API ya lo hace, doble seguridad buena practica si cambia API)
            const publishedPosts = data.filter(p => p.is_published);
            setPosts(publishedPosts);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const postsPerPage = 9; // Paginar de 9 en 9

    // Calcular índices para la paginación
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Calcular número total de páginas
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Funciones de navegación
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            {/* Breadcrumb */}
            <div
                className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb z-index-1 fix p-relative"
                data-background="/assets/images/breadcrumb/breadcrumb.jpg"
                style={{
                    backgroundImage: 'url(/assets/images/breadcrumb/breadcrumb.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tv-breadcrumb-content z-index-1 text-center">
                                <div className="tv-breadcrumb-title-box">
                                    <h3 className="tv-breadcrumb-title">Blog</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><Link to={buildUrl('/')}>Inicio</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>Blog</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Area */}
            <div className="tv-blog-area pt-130 pb-130 blog-grid">
                <div className="container">
                    <div className="row">
                        {currentPosts.length === 0 ? (
                            <div className="col-12 text-center">
                                <p>No hay artículos publicados aún.</p>
                            </div>
                        ) : (
                            currentPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp"
                                    data-wow-duration=".9s"
                                    data-wow-delay=".3s"
                                >
                                    <div className="single-blog-item style-2 style-3 mb-30">
                                        <div className="blog-image-wrapper" style={{ height: '240px', overflow: 'hidden' }}>
                                            <img
                                                src={post.image || '/assets/images/blog/blog-default.jpg'}
                                                alt={post.title}
                                                className="blog-image-angled"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="blog-content">
                                            <div className="blog-meta">
                                                <span className="author">{post.category}</span>
                                                <span className="date">{post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}</span>
                                            </div>
                                            <h2 style={{ minHeight: '60px' }}>
                                                <Link to={buildUrl(`/blog/${post.slug}`)}>{post.title}</Link>
                                            </h2>
                                            <p className="mb-3 text-muted" style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                minHeight: '72px'
                                            }}>
                                                {post.summary}
                                            </p>
                                            <Link className="read-more-btn" to={buildUrl(`/blog/${post.slug}`)}>
                                                Leer Más <i className="ri-arrow-right-line"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )))}
                    </div>

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className="row">
                            <div className="col-12">
                                <div className="tv-pagination mt-40 text-center">
                                    <nav>
                                        <ul className="pagination justify-content-center">
                                            {/* Botón Anterior */}
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={handlePrevious}
                                                    disabled={currentPage === 1}
                                                    style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                                                >
                                                    <i className="ri-arrow-left-line"></i>
                                                </button>
                                            </li>

                                            {/* Números de página */}
                                            {[...Array(totalPages)].map((_, index) => {
                                                const pageNumber = index + 1;
                                                return (
                                                    <li
                                                        key={pageNumber}
                                                        className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            onClick={() => handlePageChange(pageNumber)}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    </li>
                                                );
                                            })}

                                            {/* Botón Siguiente */}
                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={handleNext}
                                                    disabled={currentPage === totalPages}
                                                    style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                                                >
                                                    <i className="ri-arrow-right-line"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Información de paginación */}
                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            <p className="text-muted">
                                Mostrando {indexOfFirstPost + 1} - {Math.min(indexOfLastPost, posts.length)} de {posts.length} posts
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
