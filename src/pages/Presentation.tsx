import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectUserCountry, getSavedCountry, saveCountry } from '@/services/countryDetection';
import './Presentation.css';

const Presentation = () => {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Detectar país del usuario durante la animación
        const detectCountry = async (): Promise<string> => {
            try {
                // 1. Verificar si ya tiene un país guardado
                const savedCountry = getSavedCountry();

                if (savedCountry && savedCountry !== 'global') {
                    return `/${savedCountry}`;
                }

                // 2. Detectar país automáticamente
                const detectedCountry = await detectUserCountry();

                // 3. Guardar país detectado
                saveCountry(detectedCountry);

                // 4. Retornar URL de redirección
                if (detectedCountry && detectedCountry !== 'global') {
                    return `/${detectedCountry}`;
                }

                return '/home';
            } catch (error) {
                console.warn('Error detectando país:', error);
                return '/home';
            }
        };

        // Reproducir el video automáticamente
        const video = videoRef.current;
        if (video) {
            video.play().catch(err => console.error('Error playing video:', err));

            // Listener para el tiempo del video
            const handleTimeUpdate = () => {
                // A los 2 segundos, iniciar fade-out
                if (video.currentTime >= 2.5 && !fadeOut) {
                    setFadeOut(true);

                    // Redirigir 800ms después (cuando termine el fade-out)
                    setTimeout(() => {
                        detectCountry().then((redirectUrl) => {
                            navigate(redirectUrl, { replace: true });
                        });
                    }, 800);
                }
            };

            video.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [navigate, fadeOut]);

    return (
        <div className="presentation-page" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Video de presentación */}
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                    width: '80%',
                    height: 'auto',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                }}
            >
                <source src="/assets/videos/presentation.webm" type="video/webm" />
                <source src="/assets/videos/presentation.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
            </video>

            {/* Overlay de fade-out oscuro */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: '#000000',
                opacity: fadeOut ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                pointerEvents: 'none',
            }} />
        </div>
    );
};

export default Presentation;
