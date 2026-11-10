import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { buildCountryUrl } from '../config/countries';
import { blogService, BlogPost } from '../services/blogService';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BlogDetail = () => {
    // Aceptamos slug en lugar de ID
    const { id } = useParams<{ id: string }>(); // 'id' puede ser slug en la ruta actual
    const buildUrl = (path: string) => buildCountryUrl(path);

    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        if (id) {
            loadPost(id);
        }
    }, [id]);

    const loadPost = async (slugOrId: string) => {
        setLoading(true);
        try {
            // Cargar el post actual
            // Intentamos asumir que es un slug, si falla la API de slug, podríamos intentar ID
            // Pero en nuestra nueva implementacion todo es por slug o ID (API lookup field = slug)
            // Si el backend usa slug como lookup, debemos pasar slug.

            // NOTA: Si los links antiguos usan ID, esto podría fallar si el backend solo espera slug.
            // Asumiremos que los nuevos links usan slug.

            const data = await blogService.getBySlug(slugOrId);
            setPost(data);

            // Cargar posts recientes para el sidebar
            const allPosts = await blogService.getAll();
            setRecentPosts(allPosts.filter(p => p.id !== data.id).slice(0, 3));

        } catch (error) {
            console.error('Error loading post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (!post) {
        return (
            <div className="container pt-130 pb-130">
                <div className="text-center">
                    <h2>Post no encontrado</h2>
                    <br />
                    <Link to={buildUrl('/blog')} className="btn btn-primary">Volver al Blog</Link>
                </div>
            </div>
        );
    }

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
                                    <h3 className="tv-breadcrumb-title">{post.title}</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><Link to={buildUrl('/')}>Inicio</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <span><Link to={buildUrl('/blog')}>Blog</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>Detalles</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog List Area */}
            <div className="tv-blog-list-area pt-130 pb-130">
                <div className="container">
                    <div className="row">
                        {/* Left Content */}
                        <div className="col-xl-8 col-lg-8 col-12">
                            <div className="tv-blog-list-wrap">
                                <div className="tv-blog-details">
                                    {/* Hero Image */}
                                    {post.image && (
                                        <div className="tv-blog-details-thumb mb-40">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="blog-image-angled"
                                                style={{ width: '100%', borderRadius: '8px' }}
                                            />
                                        </div>
                                    )}

                                    {/* Meta Information */}
                                    <div className="tv-blog-details-meta mb-40">
                                        <span><i className="ri-user-line"></i> {post.author_name}</span>
                                        <span><i className="ri-calendar-line"></i> {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}</span>
                                        <span><i className="ri-bookmark-line"></i> {post.category}</span>
                                    </div>

                                    <div className="tv-blog-details-content">
                                        {/* Title */}
                                        <h2 className="mb-30">{post.title}</h2>

                                        {(() => {
                                            // Lógica para renderizar contenido estructurado o HTML simple
                                            let structuredContent = null;
                                            try {
                                                if (post.content && post.content.trim().startsWith('{')) {
                                                    structuredContent = JSON.parse(post.content);
                                                }
                                            } catch (e) {
                                                // No es JSON válido, tratar como HTML normal
                                            }

                                            if (structuredContent && structuredContent.intro) {
                                                // Renderizar con la estructura de plantilla original
                                                return (
                                                    <>
                                                        {/* Intro */}
                                                        <p>{structuredContent.intro}</p>

                                                        {/* Paragraph 1 */}
                                                        {structuredContent.paragraph1 && <p>{structuredContent.paragraph1}</p>}

                                                        {/* Gallery Images */}
                                                        {(() => {
                                                            const galleryImages = [post.gallery_image_1, post.gallery_image_2].filter(Boolean) as string[];
                                                            // Fallback to old JSON gallery if fields are empty (backward compatibility)
                                                            const imagesToShow = galleryImages.length > 0
                                                                ? galleryImages
                                                                : (structuredContent.gallery || []);

                                                            return imagesToShow.length > 0 && (
                                                                <div className="tv-blog-details-thumb-img d-flex justify-content-between mb-30 gap-3">
                                                                    {imagesToShow.slice(0, 2).map((imagePath: string, index: number) => (
                                                                        <div key={`gallery-${index}`} style={{ width: '48%', flex: 1 }}>
                                                                            <img
                                                                                src={imagePath}
                                                                                alt={`${post.title} - imagen ${index + 1}`}
                                                                                className="blog-image-angled w-100 h-100 object-fit-cover"
                                                                                style={{ borderRadius: '8px', minHeight: '200px' }}
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )
                                                        })()}

                                                        {/* Paragraph 2 */}
                                                        {structuredContent.paragraph2 && <p>{structuredContent.paragraph2}</p>}

                                                        {/* Quote */}
                                                        {structuredContent.quote && (
                                                            <div className="blockquote mb-40">
                                                                <svg width="62" height="44" viewBox="0 0 62 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M14.5312 0.414062C6.51702 0.414062 0 6.9329 0 14.9453C0 22.2606 5.43154 28.3306 12.4771 29.3311C11.9131 33.4287 10.3486 37.3275 7.90415 40.7085C7.42874 41.3683 7.44654 42.2624 7.9538 42.9009C8.4515 43.5292 9.31635 43.7674 10.0754 43.4473C21.6088 38.6332 29.0625 27.4438 29.0625 14.9453C29.0625 6.9329 22.5455 0.414062 14.5312 0.414062ZM47.4688 0.414062C39.4545 0.414062 32.9375 6.9329 32.9375 14.9453C32.9375 22.2606 38.369 28.3306 45.4146 29.3311C44.8506 33.4287 43.2861 37.3275 40.8417 40.7085C40.3662 41.3683 40.384 42.2624 40.8913 42.9009C41.389 43.5292 42.2538 43.7674 43.0129 43.4473C54.5463 38.6332 62 27.4438 62 14.9453C62 6.9329 55.483 0.414062 47.4688 0.414062Z" fill="#2B4DFF"></path>
                                                                </svg>
                                                                <p>{structuredContent.quote}</p>
                                                            </div>
                                                        )}

                                                        {/* Paragraph 3 */}
                                                        {structuredContent.paragraph3 && <p>{structuredContent.paragraph3}</p>}

                                                        {/* Paragraph 4 */}
                                                        {structuredContent.paragraph4 && <p>{structuredContent.paragraph4}</p>}
                                                    </>
                                                );
                                            } else {
                                                // Fallback: renderizar como HTML directo o summary
                                                return post.content ? (
                                                    <div
                                                        className="blog-html-content"
                                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                                    />
                                                ) : <p>{post.summary}</p>;
                                            }
                                        })()}

                                        {/* Tags */}
                                        {post.tags && (
                                            <div className="tv-blog-details-meta mt-40">
                                                <span><i className="ri-price-tag-3-line"></i> Etiquetas:</span>
                                                {post.tags.split(',').map((tag, index) => (
                                                    <span key={`tag-${index}`} className="ms-2 badge bg-light text-dark">{tag.trim()}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-xl-4 col-lg-4 col-12">
                            <div className="tv-sidebar-area">
                                {/* Search Widget */}
                                <div className="tv-widget widget mb-30 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                                    <h4>Buscar Aquí</h4>
                                    <div className="widget-search-form">
                                        <input type="search" placeholder="Buscar" />
                                        <button type="button">
                                            <i className="ri-search-line"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Posts Widget */}
                                <div className="tv-widget widget mb-30 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                                    <h4>Posts Recientes</h4>
                                    {recentPosts.map(blogPost => (
                                        <div key={blogPost.id} className="widget-latest-post d-flex">
                                            <div className="widget-thumb">
                                                <img
                                                    src={blogPost.image || '/assets/images/blog/blog-default.jpg'}
                                                    alt={blogPost.title}
                                                    className="blog-image-angled"
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="widget-content">
                                                <h6>
                                                    <Link to={buildUrl(`/blog/${blogPost.slug}`)}>
                                                        {blogPost.title}
                                                    </Link>
                                                </h6>
                                                <p>{blogPost.published_at ? new Date(blogPost.published_at).toLocaleDateString() : ''}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
