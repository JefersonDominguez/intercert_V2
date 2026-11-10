import { useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { buildCountryUrl, getCountryCodeFromPathname } from '../config/countries';

/**
 * Construye rutas respetando el prefijo de país activo (/co, /pe, etc.).
 * Usa useLocation + useParams para reaccionar a navegación SPA.
 */
export const useBuildCountryUrl = () => {
    const location = useLocation();
    const { countryCode: routeCountryCode } = useParams<{ countryCode?: string }>();

    const countryCode =
        (routeCountryCode && getCountryCodeFromPathname(`/${routeCountryCode}`)
            ? routeCountryCode
            : null) ?? getCountryCodeFromPathname(location.pathname);

    const buildUrl = useCallback(
        (path: string) => buildCountryUrl(path, countryCode, location.pathname),
        [countryCode, location.pathname],
    );

    const isActivePath = useCallback(
        (path: string) => {
            const target = buildCountryUrl(path, countryCode, location.pathname);
            return (
                location.pathname === target ||
                location.pathname === `${target}/`
            );
        },
        [countryCode, location.pathname],
    );

    return { buildUrl, isActivePath, countryCode };
};

export default useBuildCountryUrl;
