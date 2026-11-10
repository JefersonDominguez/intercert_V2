/**
 * Common Types
 * 
 * Shared types used across the application
 */

export type ID = string | number;

export interface BaseEntity {
    id: ID;
    created_at?: string;
    updated_at?: string;
}

export interface PaginationParams {
    limit?: number;
    offset?: number;
    page?: number;
}

export interface SortParams {
    sort_by?: string;
    order?: 'asc' | 'desc';
}

export interface FilterParams {
    search?: string;
    [key: string]: any;
}

export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export type Status = 'active' | 'inactive' | 'pending' | 'archived';

export interface Address {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
}

export interface ContactInfo {
    email?: string;
    phone?: string;
    mobile?: string;
    website?: string;
}

export interface FileMetadata {
    filename: string;
    size: number;
    type: string;
    url?: string;
    uploaded_at?: string;
}

export interface ErrorResponse {
    error: string;
    message?: string;
    details?: Record<string, any>;
}

export interface ModalState {
    isOpen: boolean;
    ticketId?: string | number;
    mode?: 'view' | 'edit' | 'create';
}

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title?: string;
    message: string;
    duration?: number;
}
