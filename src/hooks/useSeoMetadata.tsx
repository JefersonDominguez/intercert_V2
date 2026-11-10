/**
 * SEO Metadata Hook
 * 
 * Manages document head metadata for SEO
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCurrentCountry } from '../config/countries';

interface SeoMetadataProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'profile';
    schema?: Record<string, any>;
    hreflangs?: Array<{ hrefLang: string; href: string }>;
    author?: string;
    robots?: string;
    article?: {
        author?: string;
        publishedTime?: string;
        modifiedTime?: string;
        section?: string;
        tags?: string[];
    } | null;
}

const DEFAULTS = {
    title: 'INTERCERT LATAM',
    description: 'Certificaciones ISO acreditadas en toda Latinoamérica. Calidad, seguridad y confianza.',
    canonical: '',
};

const buildCountryTitle = (baseTitle: string): string => {
    const country = getCurrentCountry();
    if (!country || country.code === 'global') {
        return baseTitle;
    }
    return `${baseTitle} | ${country.name}`;
};

export const useSeoMetadata = ({
    title = DEFAULTS.title,
    description = DEFAULTS.description,
    keywords,
    canonical,
    ogImage = '/assets/images/og-default.jpg',
    ogType = 'website',
    schema,
    hreflangs = [],
    author = 'INTERCERT LATAM',
    robots = 'index, follow',
    article = null,
}: SeoMetadataProps = {}): React.ReactElement => {
    const country = getCurrentCountry();
    const fullTitle = buildCountryTitle(title);
    const canonicalUrl =
        canonical ||
        (typeof window !== 'undefined'
            ? `${window.location.origin}${window.location.pathname}`
            : '');

    // Determine language and locale based on country
    const locale = country?.code === 'es' ? 'es_ES' : 'es_LA';
    const language = 'es';

    // Full URL for Open Graph image
    const fullOgImage = ogImage.startsWith('http')
        ? ogImage
        : `https://intercertlatam.com${ogImage}`;

    return (
        <Helmet>
            {/* Basic Title and Description */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Keywords */}
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Additional SEO Meta Tags */}
            <meta name="author" content={author} />
            <meta name="robots" content={robots} />
            <meta name="language" content={language} />
            <meta name="revisit-after" content="7 days" />
            <meta name="rating" content="general" />

            {/* Geo-targeting */}
            {country?.name && (
                <>
                    <meta name="geo.region" content={country.code?.toUpperCase()} />
                    <meta name="geo.placename" content={country.name} />
                    {/* @ts-ignore */}
                    <meta name="ICBM" content={country.latitude + ',' + country.longitude || ''} />
                </>
            )}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={fullOgImage} />
            <meta property="og:image:alt" content={`${fullTitle} - INTERCERT LATAM`} />
            <meta property="og:locale" content={locale} />
            <meta property="og:site_name" content="INTERCERT LATAM" />

            {/* Article specific meta tags */}
            {article && ogType === 'article' && (
                <>
                    <meta property="article:author" content={article.author || author} />
                    {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
                    {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
                    <meta property="article:section" content={article.section || 'Certificaciones ISO'} />
                    {article.tags && article.tags.map((tag, index) => (
                        <meta key={index} property="article:tag" content={tag} />
                    ))}
                </>
            )}

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@intercertlatam" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullOgImage} />

            {/* Canonical URL */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Hreflang links */}
            {hreflangs.map((alternate) => (
                <link
                    key={alternate.hrefLang}
                    rel="alternate"
                    hrefLang={alternate.hrefLang}
                    href={alternate.href}
                />
            ))}

            {/* DNS Prefetch */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />

            {/* Schema.org JSON-LD */}
            {schema && (
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            )}

            {/* Favicon and Icons */}
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />

            {/* Mobile Theme Color */}
            <meta name="theme-color" content="#159dbc" />
            <meta name="msapplication-TileColor" content="#159dbc" />
        </Helmet>
    );
};

export default useSeoMetadata;
