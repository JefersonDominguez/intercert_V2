/**
 * Authentication Types
 * 
 * Types for authentication and authorization
 */

import type { BaseEntity } from './common';

export interface User extends BaseEntity {
    email: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    username?: string;
    role: UserRole;
    is_active: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
    phone?: string;
    company?: string;
    avatar?: string;
    profile_picture?: string;
    mfa_enabled?: boolean;
    last_login?: string;
    tracking_role?: string;
    tracking_area?: string;
    partner_status?: 'active' | 'pending' | 'denied' | 'none';
}

export type UserRole =
    | 'admin'
    | 'auditor'
    | 'partner'
    | 'afiliado'
    | 'trabajador'
    | 'client'
    | 'user'
    | 'resolver'
    | 'requester'
    | 'worker';

export interface LoginCredentials {
    email: string;
    password: string;
    remember_me?: boolean;
}

export interface RegisterData {
    email: string;
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
    phone?: string;
    company?: string;
    role?: UserRole;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
    message?: string;
}

export interface WebAuthnResponse {
    webauthnRequired: boolean;
    session: string;
    options: any;
    message: string;
}

export type LoginResponse = AuthResponse | WebAuthnResponse;

export interface MFAStatus {
    enabled: boolean;
    qr_code?: string;
    secret?: string;
}

export interface MFAVerification {
    token: string;
    code: string;
}

export interface PasswordResetRequest {
    email: string;
}

export interface PasswordResetConfirm {
    token: string;
    password: string;
    password_confirmation: string;
}

export interface AuthState {
    user: User | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface Session {
    user: User;
    expires_at: string;
    created_at: string;
}
