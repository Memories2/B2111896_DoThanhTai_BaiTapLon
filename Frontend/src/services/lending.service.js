import createApiClient from "./api.service";


class LendingService {
    constructor(baseUrl = "http://localhost:3000/api/v1/lendings") {
        this.api = createApiClient(baseUrl);
    }

    async getAllLendings() {
         let result = await this.api.get("/");
         console.log(result.data);
         return result.data;
    }
    
    async createLending(data) {
        return (await this.api.post("/", data)).data;
    }

    async getLending(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async updateLending(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async deleteLending(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    // Lấy danh sách mượn sách của một độc giả
    async getLendingsByReaderId(readerId) {
        try {
            const result = await this.api.get(`/reader/${readerId}`);
            return result.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách mượn sách của độc giả:", error);
            throw error;
        }
    }

}

export default new LendingService();
