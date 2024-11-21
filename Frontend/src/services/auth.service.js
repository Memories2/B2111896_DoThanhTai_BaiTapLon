import createApiClient from "./api.service";
import ReaderService from "./reader.service";
class AuthService {
    constructor(baseUrl = "http://localhost:3000/api/v1/auth") {
        this.api = createApiClient(baseUrl);
    }

    async login(data) {
        return (await this.api.post("/login", {
            taikhoan: data.taikhoan,
            matkhau: data.matkhau
        })).data;
    }

    async register(data) {
        return await ReaderService.createReader(data);
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.clear();
    }
    
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();