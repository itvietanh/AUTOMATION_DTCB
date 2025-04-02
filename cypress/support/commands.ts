/// <reference types="cypress" />

import { ApiService } from "../common/service/api-service";

Cypress.Commands.add('checkTokenAndLogin', (username, password?: string) => {
    const args = { username, password };

    cy.session(args, () => {
        cy.origin('ssovneid-int.teca.vn', { args }, ({ username, password }) => {
            cy.visit('/auth?client_id=qtud-master&redirect_uri=https%3A%2F%2Fvneid3a.teca.vn%2Fxac-thuc');
            cy.get('#username').type(username);
            cy.get('#password').type(password ? password : '123456aB@');
            cy.get('button').click();
        });
    }, {
        validate() {
            const token = localStorage.getItem("tokenSSO");
            if (token) return;

            // Nếu không có token, bắt đầu xác thực lại
            cy.intercept('https://vneid3a.teca.vn/api/management/sec-users/authority/user-info').as('getUsers');
            cy.wait('@getUsers');

            cy.getAllLocalStorage({ url: 'https://vneid3a.teca.vn' } as any).then(storage => {
                const tokenStr: any = storage['https://vneid3a.teca.vn']?.user_token;
                if (!tokenStr) {
                    throw new Error("Không tìm thấy token trong localStorage");
                }
                const tokenObj = JSON.parse(tokenStr);
                cy.request({
                    url: 'https://vneid3a.teca.vn/api/management/sec-users/authority/user-info',
                    headers: {
                        authorization: `Bearer ${tokenObj?.access_token}`
                    }
                }).its('status').should('equal', 200);
                localStorage.setItem("tokenSSO", tokenObj?.access_token);
            });
        }
    });
});

Cypress.Commands.add('getUserInfo', () => {
    let userToken = localStorage.getItem('user_token');
    let token: string | null = userToken ? JSON.parse(userToken).access_token : null;

    let url = 'https://vneid3a.teca.vn/api/cskv-dtcb/main/users/me';
    let headers = {
        authorization: `Bearer ${token}`
    }
    return ApiService.get(url, headers).then((response: any) => {
        return response?.body?.userInfo;
    });
});

// Thêm export {} để TypeScript nhận diện đây là module
export { };

declare global {
    namespace Cypress {
        interface Chainable {
            checkTokenAndLogin(username: string, password?: string);
            getUserInfo();
        }
    }
}
