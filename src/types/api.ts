/**
 * API Types
 * 
 * Types for API requests and responses
 */

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    status?: number;
}

export interface PaginatedResponse<T> {
    count: number;
    results: T[];
    next?: string | null;
    previous?: string | null;
    total_pages?: number;
    current_page?: number;
}

export interface ApiError {
    error: string;
    message?: string;
    details?: Record<string, string[]>;
    status?: number;
}

export interface ApiRequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, any>;
    timeout?: number;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiEndpoint {
    method: HttpMethod;
    url: string;
    requiresAuth?: boolean;
}
