export class AuthService {
    private static tokenKey = 'auth_token';

    /**
     * Đăng nhập với username, password
     * @param username 
     * @param password 
     */
    static login(username: string, password: string) {
        return cy.request<{ token: string }>({
            method: 'POST',
            url: '/api/auth/login', // Đổi lại endpoint theo thực tế
            body: { username, password }
        }).then((resp) => {
            const token = resp.body.token;
            window.localStorage.setItem(this.tokenKey, token);
            return token;
        });
    }

    /**
     * Đăng xuất, xóa token
     */
    static logout() {
        window.localStorage.removeItem(this.tokenKey);
    }

    /**
     * Lấy token hiện tại
     */
    static getToken() {
        return window.localStorage.getItem(this.tokenKey);
    }
}

/**
 * Bạn có thể export 1 instance để tiện dùng:
 *  - import { authService } from './auth-service';
 */
export const authService = AuthService;
