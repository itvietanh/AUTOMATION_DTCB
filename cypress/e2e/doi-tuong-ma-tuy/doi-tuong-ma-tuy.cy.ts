/// <reference types="cypress" />

import doiTuongService from "./service/doi-tuong-service.cy";

context('Đối tượng ma túy', () => {
    beforeEach(() => {
        cy.checkTokenAndLogin('037302001725');
    })

    it('Thêm mới đối tượng', () => {
        doiTuongService.create();
    })


});

