const { ObjectId } = require('mongodb');

class ReaderService {
    constructor(client) {
        this.collection = client.db().collection("DocGia"); // Khởi tạo đối tượng collection để tương tác với collection "DocGia" trong cơ sở dữ liệu
    }

    // Tạo mã độc giả ngẫu nhiên
    generateReaderCode() {
        return 'READER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Trích xuất dữ liệu từ payload
    extractData(payload) {
        return {
            MaDocGia: this.generateReaderCode(),
            PassWord: payload.PassWord,
            HoLot: payload.HoLot,
            Ten: payload.Ten,
            NgaySinh: payload.NgaySinh,
            Phai: payload.Phai,
            DiaChi: payload.DiaChi,
            DienThoai: payload.DienThoai,
        };
    }

    // Tạo một độc giả mới
    async create(readerData) {
        const document = this.extractData(readerData);
        const result = await this.collection.insertOne(document); //
        if (result.insertedCount === 0) {
            throw new Error('Failed to create reader');
        }
        return document;
    }

    // Lấy danh sách tất cả các độc giả
    async getAll() {
        return await this.collection.find({}).toArray();
    }

    // Lấy thông tin chi tiết của một độc giả
    async getById(readerCode) {
        return await this.collection.findOne({ MaDocGia: readerCode });
    }

    // Cập nhật thông tin độc giả
    async update(readerCode, data) {
        const document = this.extractData(data);
        delete document.MaDocGia;
        const result = await this.collection.findOneAndUpdate(
            { MaDocGia: readerCode },
            { $set: document },
            { returnDocument: 'after' },
        );
        if (!result) {
            throw new Error('Failed to update reader');
        }
        return result;
    }

    // Xóa độc giả
    async delete(readerCode) {
        const result = await this.collection.deleteOne({ MaDocGia: readerCode });
        return result.deletedCount > 0;
    }

    // Xóa tất cả độc giả
    async deleteAll() {
        const result = await this.collection.deleteMany({});
        return result.deletedCount > 0;
    }
}

module.exports = ReaderService;