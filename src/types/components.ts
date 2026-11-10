/**
 * Component Types
 * 
 * Common prop types for React components
 */

import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// Button Props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
}

// Input Props
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

// Card Props
export interface CardProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    footer?: ReactNode;
    className?: string;
    hoverable?: boolean;
    onClick?: () => void;
}

// Modal Props
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
}

// Table Props
export interface TableColumn<T = any> {
    key: string;
    title: string;
    render?: (value: any, record: T, index: number) => ReactNode;
    sortable?: boolean;
    width?: string | number;
    align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
    columns: TableColumn<T>[];
    data: T[];
    loading?: boolean;
    emptyText?: string;
    onRowClick?: (record: T, index: number) => void;
    rowKey?: string | ((record: T) => string);
}

// Form Props
export interface FormFieldProps {
    name: string;
    label?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
}

// Pagination Props
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    pageSize?: number;
    totalItems?: number;
}

// Alert Props
export interface AlertProps {
    type?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    message: string;
    closable?: boolean;
    onClose?: () => void;
}

// Badge Props
export interface BadgeProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
}

// Dropdown Props
export interface DropdownOption {
    value: string | number;
    label: string;
    disabled?: boolean;
    icon?: ReactNode;
}

export interface DropdownProps {
    options: DropdownOption[];
    value?: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    disabled?: boolean;
    searchable?: boolean;
    multiple?: boolean;
}
