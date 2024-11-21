import createApiClient from "./api.service";

class PublisherService {
    constructor(baseUrl = "http://localhost:3000/api/v1/publishers") {
        this.api = createApiClient(baseUrl);
    }

    async getPublishers() {
        return (await this.api.get("/")).data;
    }

    async createPublisher(data) {
        return (await this.api.post("/", data)).data;
    }

    async updatePublisher(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async deletePublisher(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async getPublisher(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async searchPublisher(query) {
        return (await this.api.get(`/search?q=${query}`)).data;
    }
}

export default new PublisherService();
