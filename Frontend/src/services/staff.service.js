import createApiClient from "./api.service";

class StaffService {
    constructor(baseUrl = "http://localhost:3000/api/v1/staffs") {
        this.api = createApiClient(baseUrl);
    }

    async getAllStaffs() {
        return (await this.api.get("/")).data;
    }

    async getStaff(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async createStaff(data) {
        console.log(data);
        return (await this.api.post("/", data)).data;
    }


    async updateStaff(id, data) {

        return (await this.api.put(`/${id}`, data)).data;
    }

    async deleteStaff(id) {
        return (await this.api.delete(`/${id}`)).data;
    }



    // async searchBook(query) {
    //     return (await this.api.get(`/search?search=${query}`)).data;
    // }
}

export default new StaffService();
