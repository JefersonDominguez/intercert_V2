/**
 * Certificaciones Clean API Service
 * 
 * Service for consuming the Clean Architecture Certification API
 */

import { api } from './api';
import {
    demoCompanyCertificates,
    demoSearchResponse,
    demoVerifyResponse,
} from '../data/demoCertificate';
import type {
    Certificate,
    Company,
    ISOStandard,
    Sector,
    CertificateFormData,
    CertificateVerification
} from '@/types/certification';
import type { ApiResponse, PaginatedResponse } from '@/types/api';

export interface CompanyCertificatesResponse {
    certificates: any[];
    total_count: number;
    returned_count: number;
    company: {
        id: number;
        name: string;
        country: string;
    } | null;
}

export const certificacionesCleanApi = {
    /**
     * Verify a certificate by number or token
     */
    verify: async (identifier: string, _type: 'number' | 'token' = 'number'): Promise<CertificateVerification> => {
        const response = demoVerifyResponse(identifier);
        if (response.valid && response.certificate) {
            return response as unknown as CertificateVerification;
        }
        return { valid: false, certificate: null } as unknown as CertificateVerification;
    },

    /**
     * Public search for certificates (by company name, RUC or number)
     */
    search: async (query: string, _limit: number = 20): Promise<PaginatedResponse<Certificate>> => {
        return demoSearchResponse(query) as unknown as PaginatedResponse<Certificate>;
    },

    /**
     * Get certificates for a specific company
     */
    getCompanyCertificates: async (companyId: number | string): Promise<CompanyCertificatesResponse> => {
        const data = demoCompanyCertificates(companyId);
        if (data.company) return data;
        return { certificates: [], total_count: 0, returned_count: 0, company: null };
    },

    /**
     * Create a new certificate
     */
    createCertificate: async (payload: CertificateFormData): Promise<ApiResponse<Certificate>> => {
        const response = await api.post<ApiResponse<Certificate>>('/certifications/', payload);
        return response.data;
    },

    /**
     * Update an existing certificate
     */
    updateCertificate: async (id: number | string, payload: Partial<CertificateFormData>): Promise<ApiResponse<Certificate>> => {
        const response = await api.put<ApiResponse<Certificate>>(`/certifications/${id}/`, payload);
        return response.data;
    },

    /**
     * Search companies (for administration)
     */
    searchCompanies: async (query: string): Promise<PaginatedResponse<Company>> => {
        const response = await api.get<PaginatedResponse<Company>>('/companies/search/', {
            params: { q: query }
        });
        return response.data;
    },

    /**
     * Get company details
     */
    getCompanyDetails: async (companyId: number | string): Promise<Company> => {
        const response = await api.get<Company>(`/companies/${companyId}/`);
        return response.data;
    },

    /**
     * Get all active ISO standards
     */
    getStandards: async (): Promise<ISOStandard[]> => {
        const response = await api.get<ISOStandard[]>('/iso-standards/');
        return response.data;
    },

    /**
     * Get all company sectors
     */
    getSectors: async (): Promise<Sector[]> => {
        const response = await api.get<Sector[]>('/sectors/');
        return response.data;
    },

    /**
     * Get executives for a specific country
     */
    getExecutives: async (country: string): Promise<{ executives: any[] }> => {
        const response = await api.get<{ executives: any[] }>('/executives/', {
            params: { country }
        });
        return response.data;
    },

    /**
     * Alias for getStandards (for compatibility)
     */
    getIsoStandards: async (): Promise<ISOStandard[]> => {
        return certificacionesCleanApi.getStandards();
    },

    /**
     * Create a new sector
     */
    createSector: async (payload: { name: string }): Promise<Sector> => {
        const response = await api.post<Sector>('/sectors/', payload);
        return response.data;
    },

    /**
     * Create a new ISO standard
     */
    createIsoStandard: async (payload: Partial<ISOStandard>): Promise<ISOStandard> => {
        const response = await api.post<ISOStandard>('/iso-norms/', payload);
        return response.data;
    }
};

export default certificacionesCleanApi;
