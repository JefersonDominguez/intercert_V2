/**
 * Management Dashboard Service
 * Handles API calls for management analytics
 */

const API_BASE = '/api';

export interface StatusCounts {
    total: number;
    new: number;
    in_progress: number;
    on_hold: number;
    resolved: number;
    closed: number;
}

export interface PriorityCounts {
    urgent: number;
    high: number;
    medium: number;
    low: number;
}

export interface AreaStat {
    area: string;
    total: number;
    open: number;
    on_hold: number;
    resolved: number;
}

export interface AreaPerformance {
    area: string;
    total_resolved: number;
    avg_resolution_hours: number;
    open_count: number;
}

export interface TrendData {
    date: string;
    count: number;
}

export interface SLACompliance {
    area: string;
    total: number;
    resolved_on_time: number;
    resolved_late: number;
    open_overdue: number;
    open_on_time: number;
    compliance_rate: number;
}

export interface OldestTicket {
    ticket_id: string;
    title: string;
    area: string;
    priority: string;
    status: string;
    created_at: string;
}

export interface ResolverStat {
    name: string;
    count: number;
}

export interface HeatmapItem {
    day: number;
    hour: number;
    value: number;
}

export interface CategoryStat {
    request_type__name: string;
    count: number;
}

export interface AdvancedMetrics {
    top_resolvers: ResolverStat[];
    heatmap_data: HeatmapItem[];
    common_categories: CategoryStat[];
}

export interface DashboardOverview {
    status_counts: StatusCounts;
    priority_counts: PriorityCounts;
    area_stats: AreaStat[];
    oldest_tickets: OldestTicket[];
    avg_first_response_hours: number;
    overdue_tickets_count: number;
    reopened_tickets_count: number;
    priority_resolution_times: Record<string, number>;
}

export interface PerformanceData {
    area_performance: AreaPerformance[];
}

export interface TrendsData {
    created_trends: TrendData[];
    resolved_trends: TrendData[];
}

export interface SLAData {
    sla_by_area: SLACompliance[];
}

class ManagementDashboardService {
    private getAuthHeaders(): HeadersInit {
        const token = localStorage.getItem('authToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    async getOverview(): Promise<DashboardOverview> {
        const response = await fetch(`${API_BASE}/management/overview/`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch overview data');
        }

        return response.json();
    }

    async getAreaPerformance(): Promise<PerformanceData> {
        const response = await fetch(`${API_BASE}/management/area-performance/`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch area performance data');
        }

        return response.json();
    }

    async getTrends(days: number = 30): Promise<TrendsData> {
        const response = await fetch(`${API_BASE}/management/trends/?days=${days}`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch trends data');
        }

        return response.json();
    }

    async getSLACompliance(): Promise<SLAData> {
        const response = await fetch(`${API_BASE}/management/sla-compliance/`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch SLA compliance data');
        }

        return response.json();
    }

    async getAdvancedMetrics(): Promise<AdvancedMetrics> {
        const response = await fetch(`${API_BASE}/management/advanced-metrics/`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch advanced metrics');
        }

        return response.json();
    }
}

export const managementDashboardService = new ManagementDashboardService();
