import createApiClient from "./api.service";

class ReaderService {
    constructor(baseUrl = "http://localhost:3000/api/v1/readers") {
        this.api = createApiClient(baseUrl);
    }

    async getAllReaders() {
        return (await this.api.get("/")).data;
    }

    async getReader(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async createReader(data) {
        const readerData = {
            PassWord: data.Password,
            HoLot: data.HoLot,
            Ten: data.Ten,
            NgaySinh: data.NgaySinh,
            Phai: data.Phai,
            DiaChi: data.DiaChi,
            DienThoai: data.DienThoai,
        };
        return (await this.api.post("/", readerData)).data;
    }

    async updateReader(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async deleteReader(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new ReaderService();
