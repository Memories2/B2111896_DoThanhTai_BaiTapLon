const { ObjectId } = require('mongodb'); // Import ObjectId từ thư viện mongodb để làm việc với các ID của tài liệu

class PublisherService {
    constructor(client) {
        this.collection = client.db().collection("NhaXuatBan");// Khởi tạo đối tượng collection để tương tác với collection "publishers" trong cơ sở dữ liệu
    }

    // Tạo mã nhà xuất bản ngẫu nhiên
    generatePublisherCode() {
        return 'PUBLISHER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    extractData(payload) {
        return {
            MaNhaXB: this.generatePublisherCode(),
            TenNhaXB: payload.TenNhaXB,
            DiaChi: payload.DiaChi,
        };
    }

    // Tạo một nhà xuất bản mới
    async create(publisherData) {
        const document = this.extractData(publisherData); // Trích xuất dữ liệu từ  publisherData
        const result = await this.collection.insertOne(document); // Chèn tài liệu mới vào collection "publishers"
        if (result.insertedCount === 0) { // Nếu không chèn được tài liệu
            throw new Error('Failed to create document');
        }
        return document; // Trả về tài liệu mới được tạo
    }

    // Lấy danh sách tất cả các nhà xuất bản
    async getAll() {
        return await this.collection.find({}).toArray();
    }

    // Lấy thông tin chi tiết của một nhà xuất bản
    async getById(publisherCode) {
        return await this.collection.findOne({ MaNhaXB : publisherCode });
    }

    async update(publisherCode, data) {
        const document = this.extractData(data);
        delete document.MaNhaXB;
        const result = await this.collection.findOneAndUpdate(
            { MaNhaXB: publisherCode },
            { $set: document },
            { returnDocument: 'after' },
        );
        if (!result) {
            throw new Error('Failed to update document');
        }
        return result;
    }

    async delete(publisherCode) {
        const result = await this.collection.deleteOne({ MaNhaXB: publisherCode });
        return result.deletedCount > 0;
    }

    async deleteAll() {
        const result = await this.collection.deleteMany({});
        return result.deletedCount > 0;
    }
}

module.exports = PublisherService; // Xuất class PublisherService để sử dụng trong các file khác