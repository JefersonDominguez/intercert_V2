import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que hace scroll al inicio de la página en cada cambio de ruta
 */
export default function ScrollToTop(): null {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
