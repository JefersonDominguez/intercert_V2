/**
 * API Service
 * 
 * Main API service with axios instance and interceptors
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE = '/api';

/**
 * Custom Axios instance for authenticated requests
 */
class ApiService {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: API_BASE,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            timeout: 30000,
        });

        this.setupInterceptors();
    }

    /**
     * Setup request and response interceptors
     */
    private setupInterceptors(): void {
        // Request interceptor - Add auth token
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken');
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );

        // Response interceptor - Handle token refresh (like Facebook, Instagram)
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

                // Si es 401 y no hemos intentado refrescar aún
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        if (!refreshToken) {
                            throw new Error('No refresh token available');
                        }

                        // Llamar al endpoint de refresh
                        const res = await axios.post<{ access: string; refresh?: string }>('/api/auth/refresh_token/', {
                            refresh: refreshToken
                        });

                        const { access, refresh: newRefreshToken } = res.data;

                        // Guardar nuevo access token
                        localStorage.setItem('authToken', access);

                        // Si hay rotación de refresh token, guardarlo también
                        if (newRefreshToken) {
                            localStorage.setItem('refreshToken', newRefreshToken);
                        }

                        // Reintentar la petición original con el nuevo token
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${access}`;
                        }

                        return axios(originalRequest);
                    } catch (refreshError) {
                        // Si el refresh falla, cerrar sesión
                        console.error('Token refresh failed:', refreshError);
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('refreshToken');
                        localStorage.removeItem('user');

                        // Redirigir a login solo si no estamos ya ahí
                        window.location.href = 'https://portal.intercertlatam.com/';

                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    /**
     * GET request
     */
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.get<T>(url, config);
    }

    /**
     * POST request
     */
    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.post<T>(url, data, config);
    }

    /**
     * PUT request
     */
    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.put<T>(url, data, config);
    }

    /**
     * PATCH request
     */
    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.patch<T>(url, data, config);
    }

    /**
     * DELETE request
     */
    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.delete<T>(url, config);
    }

    /**
     * Get axios instance (for advanced usage)
     */
    getInstance(): AxiosInstance {
        return this.instance;
    }
}

// Create singleton instance
const apiService = new ApiService();

// Export instance methods
export const api = apiService.getInstance();

// Export default
export default api;

// Export class for testing
export { ApiService };

/**
 * Legacy API functions (for backward compatibility)
 */

interface SearchCompaniesResponse {
    results: any[];
    count: number;
    next?: string;
    previous?: string;
}

interface CertificateVerificationResponse {
    certificate: any;
    is_valid: boolean;
    message?: string;
}

/**
 * Search companies and certificates
 */
export const searchCompanies = async (
    query: string,
    page: number = 1,
    pageSize: number = 100
): Promise<SearchCompaniesResponse> => {
    const params = {
        q: query,
        page,
        page_size: pageSize,
    };
    const response = await api.get<SearchCompaniesResponse>('/api/public/verify/search/', { params });
    return response.data;
};

/**
 * Verify certificate by registration number
 */
export const verifyCertificate = async (
    registrationNumber: string
): Promise<CertificateVerificationResponse> => {
    const params = { 'registration-number': registrationNumber };
    const response = await api.get<CertificateVerificationResponse>('/api/public/verify/verify/', { params });
    return response.data;
};

/**
 * Get other certificates from a company
 */
export const getOtherCertificates = async (
    companyId: number | string,
    excludeCertificateId?: number | string | null
): Promise<any[]> => {
    const params: Record<string, any> = { company_id: companyId };
    if (excludeCertificateId) {
        params.exclude_certificate_id = excludeCertificateId;
    }
    const response = await api.get<any[]>('/api/public/verify/company_certificates/', { params });
    return response.data;
};

/**
 * Generic search (certificate or company)
 */
export const search = async (query: string): Promise<{ type: 'certificate' | 'companies'; data: any }> => {
    const isCertificateCode = /^[A-Z]{1,2}-[A-Z0-9]{2,6}-\d+$/.test(query);

    if (isCertificateCode) {
        try {
            const certificate = await verifyCertificate(query);
            return { type: 'certificate', data: certificate };
        } catch (error) {
            const results = await searchCompanies(query, 1, 500);
            return { type: 'companies', data: results };
        }
    } else {
        const results = await searchCompanies(query, 1, 500);
        return { type: 'companies', data: results };
    }
};
