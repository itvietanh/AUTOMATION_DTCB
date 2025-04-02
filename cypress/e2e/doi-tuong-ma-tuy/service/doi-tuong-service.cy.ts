import { Utils } from "../../../common/utils";

class DoiTuongService {
    constructor() {

    }

    private citizen = [
        {
            "citizenId": 1060367283,
            "fullName": "VƯƠNG THANH BÌNH",
            "genderId": 2,
            "gender": "Nam",
            "dateOfBirth": "19701028",
            "idNumber": "01052570050",
            "householdRegistrationNumber": "0197533232",
            "householdFullName": "VƯƠNG THANH BÌNH",
            "householdIdNumber": "01052570050",
            "householdRelationshipId": 2
        },
        {
            "citizenId": 1060367284,
            "fullName": "TẠ THỊ NGUYỆT",
            "genderId": 3,
            "gender": "Nữ",
            "dateOfBirth": "19750408",
            "idNumber": "01024645170",
            "householdRegistrationNumber": "0197533232",
            "householdFullName": "VƯƠNG THANH BÌNH",
            "householdIdNumber": "01052570050",
            "householdRelationshipId": 1
        },
        {
            "citizenId": 1060367287,
            "fullName": "VƯƠNG HIỀN CHI",
            "genderId": 3,
            "gender": "Nữ",
            "dateOfBirth": "20100809",
            "idNumber": "01024645150",
            "householdRegistrationNumber": "0197533232",
            "householdFullName": "VƯƠNG THANH BÌNH",
            "householdIdNumber": "01052570050",
            "householdRelationshipId": 1
        },
        {
            "citizenId": 1052549617,
            "fullName": "NGUYỄN THỊ YẾN",
            "genderId": 3,
            "gender": "Nữ",
            "dateOfBirth": "19741031",
            "idNumber": "01056837710",
            "householdRegistrationNumber": "0198257240",
            "householdFullName": "NGUYỄN THANH BÌNH",
            "householdIdNumber": "01006712060",
            "householdRelationshipId": 1
        }
    ];

    create() {
        cy.visit('https://vneid3a.teca.vn/master');

        cy.wait(500);

        cy.contains('.list .item', 'Phân hệ quản lý thông tin công tác phòng chống tội phạm, ANQG, TTATXH')
            .should('exist')
            .click();

        cy.wait(300);

        cy.get("div.ant-menu-submenu-title").find("span").contains("Đối tượng bán lẻ ma túy").click();

        cy.wait(300);
        cy.get("li.ant-menu-item").contains("Quản lý đối tượng bán lẻ ma túy").click();

        cy.get('.header-trigger').click();

        cy.get("button").contains("Thêm mới").click();

        cy.get('button.w-40.ng-star-inserted')
            .should('exist')
            .click();

        this.searchCitizen();
    }

    searchCitizen() {
        const rdN = Utils.generateRandomNumber(0, 3);
        //Họ tên
        cy.get('app-input.fullName').type(this.citizen[rdN]?.fullName);

        //Số CCCD
        cy.get('app-input.idNumber').type(this.citizen[rdN]?.idNumber);

        //Ngày sinh
        cy.get('app-datepicker.dateOfBirth').type(Utils.convertDateFormat(this.citizen[rdN]?.dateOfBirth)?.toString() || '');

        //Nơi cư trú
        cy.get('app-select.type').click();
        cy.wait(300);
        cy.get('div.ïtem-option').eq(0).click();

        cy.getUserInfo().then((userInfo) => {
            // Tỉnh/Thành
            cy.get('app-tim-kiem-doi-tuong .col-span-4.province nz-select input')
                .should('exist')
                .click().type(userInfo?.cityName ?? '');
            cy.get('div.ïtem-option').eq(0).click();

            // Quận/huyện
            cy.wait(300);
            cy.get('app-tim-kiem-doi-tuong .col-span-4.district nz-select input')
                .should('exist')
                .click().type(userInfo?.districtName ?? '');
            cy.get('div.ïtem-option').eq(0).click();

            // Phường/xã
            cy.wait(300);
            cy.get('app-tim-kiem-doi-tuong .col-span-4.ward nz-select input')
                .should('exist')
                .click().type(userInfo?.wardName ?? '');
            cy.get('div.ïtem-option').eq(0).click();
            cy.wait(300);
        });

        cy.get('app-tim-kiem-doi-tuong button span').contains('Tìm kiếm').click();

        cy.wait(500);

        cy.get('app-tim-kiem-doi-tuong app-table').within(() => {
            cy.get('tbody tr td').then(($tds) => {
                //Pthuc lodash _.
                const found = Cypress._.some($tds, (td) => td.innerText.trim() === this.citizen[rdN]?.idNumber);

                if (found) {
                    cy.log('Tìm thấy dữ liệu trong bảng');
                    cy.wait(1000);
                    cy.get('button span').contains('Chọn').click();
                } else {
                    cy.log('Không tìm thấy dữ liệu, thực hiện tìm kiếm lại');

                    // Thực hiện lại quá trình tìm kiếm
                    cy.get('app-select.type').click();
                    cy.wait(300);
                    cy.get('div.ïtem-option').eq(Utils.generateRandomNumber(0, 2)).click();
                    cy.wait(300);
                    cy.get('app-tim-kiem-doi-tuong button span').contains('Tìm kiếm').click();
                }
            });
        });
    }

    
    update() {
        
    }

    delete() {
        
    }
}

const doiTuongService = new DoiTuongService();
export default doiTuongService;