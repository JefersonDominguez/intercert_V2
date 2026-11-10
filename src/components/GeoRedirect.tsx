import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './UI/LoadingSpinner';
import { detectUserCountry, getSavedCountry, saveCountry } from '@/services/countryDetection';

interface GeoRedirectProps {
    children?: React.ReactNode;
}

export const GeoRedirect = ({ children }: GeoRedirectProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [shouldRenderChildren, setShouldRenderChildren] = useState(false);

    useEffect(() => {
        const detectAndRedirect = async () => {
            try {
                // 1. Verificar si ya tiene un país guardado
                const savedCountry = getSavedCountry();

                if (savedCountry && savedCountry !== 'global') {
                    navigate(`/${savedCountry}`, { replace: true });
                    return;
                }

                // 2. Detectar país automáticamente
                const detectedCountry = await detectUserCountry();

                // 3. Guardar país detectado
                saveCountry(detectedCountry);

                // 4. Redirigir si no es global
                if (detectedCountry && detectedCountry !== 'global') {
                    navigate(`/${detectedCountry}`, { replace: true });
                } else {
                    // Si es global, mostrar contenido (Presentation)
                    setShouldRenderChildren(true);
                }
            } catch (error) {
                // Fallback a global
                setShouldRenderChildren(true);
            } finally {
                setLoading(false);
            }
        };

        detectAndRedirect();
    }, [navigate]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (shouldRenderChildren) {
        return <>{children}</>;
    }

    return null;
};
