/**
 * Localized Content Hook
 * 
 * Hook to access localized content based on current route
 */

import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentCountry } from '../config/countries';
import { getLocalizedContent } from '../config/localizedContent';
import type { LocalizedContent, CountryConfig } from '@/types/config';

/**
 * Hook to get all localized content for the current country
 */
export const useLocalizedContent = (): LocalizedContent => {
    const location = useLocation();

    const content = useMemo(() => {
        const country = getCurrentCountry();
        return getLocalizedContent(country.code);
    }, [location.pathname]);

    return content;
};

/**
 * Hook to get only the current country configuration
 */
export const useCurrentCountry = (): CountryConfig => {
    const location = useLocation();

    const country = useMemo(() => {
        return getCurrentCountry();
    }, [location.pathname]);

    return country;
};

export default useLocalizedContent;
