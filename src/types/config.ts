/**
 * Config Types
 * 
 * Types for configuration and localization
 */

export interface ContactOffice {
    title: string;
    phone?: string;
    mobilePhone?: string;
    email?: string;
    address?: string;
}

export interface CountryConfig {
    code: string;
    name: string;
    flag: string;
    route: string;
    domain: string;
    fullUrl: string;
    languages: string[];
    currency: string;
    phone: string;
    email: string;
    address?: string;
    contactOffices?: ContactOffice[];
    timezone: string;
    logo: string;
    mapUrl: string;
    mapEmbedUrl: string;
}

export interface LocalizedContent {
    country: CountryConfig;
    logos: {
        main: string;
        white?: string;
        footer?: string;
    };
    testimonials: Testimonial[];
    heroImages: {
        main: string;
        about: string;
        services: string;
    };
    successStories: SuccessStory[];
    contact: {
        phone: string;
        email: string;
        address: string;
        mapUrl: string;
    };
}

export interface Testimonial {
    id: string | number;
    name: string;
    position: string;
    company: string;
    content: string;
    image?: string;
    country?: string;
    rating?: number;
    iso?: string;
}

export interface SuccessStory {
    id: string | number;
    title: string;
    description: string;
    image: string;
    company: string;
    year?: number;
}
