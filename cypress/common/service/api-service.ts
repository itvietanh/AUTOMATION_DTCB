import { authService } from './auth-service';

export class ApiService {
    static get<T>(url: string, headers: Record<string, string> = {}) {
        // const token = authService.getToken();
        return cy.request<T>({
            method: 'GET',
            url,
            headers: {
                ...headers
            }
        });
    }

    static create<T>(url: string, body: any, headers: Record<string, string> = {}) {
        const token = authService.getToken();
        return cy.request<T>({
            method: 'POST',
            url,
            body,
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        });
    }

    static update<T>(url: string, body: any, headers: Record<string, string> = {}) {
        const token = authService.getToken();
        return cy.request<T>({
            method: 'PUT',
            url,
            body,
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        });
    }

    static delete<T>(url: string, headers: Record<string, string> = {}) {
        const token = authService.getToken();
        return cy.request<T>({
            method: 'DELETE',
            url,
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        });
    }
}
