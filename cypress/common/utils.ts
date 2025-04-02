export class Utils {
    /**
     * Tạo string ngẫu nhiên với độ dài tùy ý.
     * @param length - Độ dài của chuỗi cần tạo.
     * @returns Chuỗi ngẫu nhiên.
     */
    public static generateRandomString(length: number = 8): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Tạo email ngẫu nhiên để test.
     * @param domain - Tên miền email (mặc định là example.com).
     * @returns Chuỗi email hợp lệ.
     */
    public static generateRandomEmail(domain: string = 'example.com'): string {
        const randomPart = Utils.generateRandomString(6);
        return `${randomPart}@${domain}`;
    }

    /**
     * Tạo số ngẫu nhiên trong khoảng [min, max].
     * @param min - Giá trị nhỏ nhất.
     * @param max - Giá trị lớn nhất.
     * @returns Số ngẫu nhiên trong khoảng [min, max].
     */
    public static generateRandomNumber(min: number = 0, max: number = 100): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Kiểm tra email có hợp lệ hay không.
     * @param email - Chuỗi email cần kiểm tra.
     * @returns true nếu hợp lệ, ngược lại false.
     */
    public static isValidEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Format Date thành chuỗi YYYY-MM-DD.
     * @param date - Đối tượng Date.
     * @returns Chuỗi dạng YYYY-MM-DD.
     */
    public static formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    /**
     * Parse chuỗi YYYY-MM-DD thành đối tượng Date.
     * @param dateStr - Chuỗi dạng YYYY-MM-DD.
     * @returns Đối tượng Date (hoặc null nếu parse không thành công).
     */
    public static parseDate(dateStr: string): Date | null {
        const parts = dateStr.split('-');
        if (parts.length !== 3) return null;
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        return isNaN(date.getTime()) ? null : date;
    }

    /**
 * Chuyển đổi chuỗi yyyyMMdd thành định dạng dd/MM/yyyy.
 * @param dateStr - Chuỗi ngày dạng yyyyMMdd.
 * @returns Chuỗi ngày dạng dd/MM/yyyy (hoặc null nếu không hợp lệ).
 */
    public static parseNumberToDate(dateStr: string): string | null {
        if (!/^\d{8}$/.test(dateStr)) return null;

        const year = parseInt(dateStr.substring(0, 4), 10);
        const month = parseInt(dateStr.substring(4, 6), 10) - 1;
        const day = parseInt(dateStr.substring(6, 8), 10);

        const date = new Date(year, month, day);
        return isNaN(date.getTime()) ? null :
            date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    /**
 * Chuyển đổi chuỗi yyyyMMdd thành ddMMyyyy.
 * @param dateStr - Chuỗi ngày dạng yyyyMMdd.
 * @returns Chuỗi ngày dạng ddMMyyyy (hoặc null nếu không hợp lệ).
 */
    public static convertDateFormat(dateStr: string): string | null {
        if (!/^\d{8}$/.test(dateStr)) return null; // Kiểm tra định dạng hợp lệ

        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);

        return `${day}${month}${year}`;
    }

    /**
     * Chuyển đổi số thành định dạng tiền tệ (USD, VND,...).
     * @param amount - Số tiền.
     * @param locale - Locale (mặc định 'en-US').
     * @param currency - Loại tiền tệ (mặc định 'USD').
     * @returns Chuỗi định dạng tiền tệ, ví dụ "$1,234.00".
     */
    public static formatCurrency(amount: number, locale: string = 'en-US', currency: string = 'USD'): string {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(amount);
    }

    /**
     * Chuyển chữ cái đầu thành in hoa (capitalize).
     * @param str - Chuỗi input.
     * @returns Chuỗi với chữ cái đầu in hoa.
     */
    public static capitalize(str: string): string {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Tạo slug (URL-friendly) từ 1 chuỗi.
     * @param text - Chuỗi input.
     * @returns Chuỗi dạng slug.
     */
    public static toSlug(text: string): string {
        return text
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    /**
     * Tạo số điện thoại ngẫu nhiên theo định dạng Việt Nam.
     * @returns Chuỗi số điện thoại hợp lệ (VD: 0987654321, 0912345678)
     */
    public static generateRandomPhoneNumber(): string {
        const prefixes = [
            '032', '033', '034', '035', '036', '037', '038', '039', // Viettel
            '070', '076', '077', '078', '079',                          // Mobifone
            '081', '082', '083', '084', '085', '086', '088',             // Vinaphone
            '089', '090', '093', '094',                                 // Viettel, Mobi, Vina
            '096', '097', '098', '099'                                  // Các mạng khác
        ];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const lineNumber = Math.floor(1000000 + Math.random() * 9000000);
        return `${prefix}${lineNumber}`;
    }

    /**
     * Tạo số điện thoại quốc tế theo định dạng +84.
     * @returns Chuỗi số điện thoại dạng quốc tế (VD: +84987654321)
     */
    public static generateInternationalPhoneNumber(): string {
        const phoneNumber = Utils.generateRandomPhoneNumber();
        return `+84${phoneNumber.substring(1)}`;
    }

    /**
     * Tạo tên đầy đủ ngẫu nhiên bằng tiếng Việt.
     * @returns Chuỗi tên đầy đủ (VD: Nguyễn Văn Nam, Trần Thị Lan)
     */
    public static generateRandomFullName(): string {
        const firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương"];
        const middleNames = ["Văn", "Thị", "Hữu", "Minh", "Đức", "Gia", "Như", "Thanh", "Bảo", "Quốc", "Ngọc", "Phương"];
        const lastNames = ["Anh", "Bình", "Châu", "Dũng", "Hà", "Hải", "Hạnh", "Hiền", "Hưng", "Khoa", "Lan", "Long", "Linh", "Mai", "Nam", "Nga", "Nguyên", "Phát", "Quang", "Sơn", "Tâm", "Trang", "Trung", "Tuấn", "Uyên", "Vân", "Vũ"];

        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return `${firstName} ${middleName} ${lastName}`;
    }

    /**
     * Tạo địa chỉ ngẫu nhiên tại Việt Nam.
     * @returns Chuỗi địa chỉ (VD: 123 Lý Thái Tổ, P.3, Q.10, TP.HCM)
     */
    public static generateRandomAddress(): string {
        const streets = ["Lý Thái Tổ", "Nguyễn Huệ", "Trần Hưng Đạo", "Hai Bà Trưng", "Điện Biên Phủ", "Hoàng Diệu", "Lê Lợi", "Phan Chu Trinh"];
        const wards = ["P.1", "P.2", "P.3", "P.4", "P.5", "P.6", "P.7", "P.8", "P.9", "P.10"];
        const districts = ["Q.1", "Q.3", "Q.5", "Q.7", "Q.10", "Q.Bình Thạnh", "Q.Tân Bình", "Q.Phú Nhuận", "Q.Gò Vấp"];
        const cities = ["TP.HCM", "Hà Nội", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Nha Trang", "Vũng Tàu", "Huế"];

        const houseNumber = Utils.generateRandomNumber(1, 200);
        const street = streets[Math.floor(Math.random() * streets.length)];
        const ward = wards[Math.floor(Math.random() * wards.length)];
        const district = districts[Math.floor(Math.random() * districts.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];

        return `${houseNumber} ${street}, ${ward}, ${district}, ${city}`;
    }

    /**
     * Tạm dừng (wait) một khoảng thời gian (bằng Promise).
     * @param ms - Thời gian chờ (ms).
     * @returns Promise<void>
     */
    public static sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
