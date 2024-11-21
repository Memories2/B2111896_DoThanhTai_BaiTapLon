const { ObjectId } = require('mongodb');

class LendingService {
    constructor(client) {
        this.collection = client.db().collection("TheoGioiMuonSach"); // Khởi tạo đối tượng collection để tương tác với collection "TheoGioiMuonSach" trong cơ sở dữ liệu
    }

    // Tạo mã mượn sách ngẫu nhiên
    generateLendingCode() {
        return 'LENDING-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Trích xuất dữ liệu từ payload
    extractData(payload) {
        return {
            MaMuonSach: this.generateLendingCode(),
            MaDocGia: payload.MaDocGia,
            MaSach: payload.MaSach,
            NgayMuon: payload.NgayMuon,
            NgayTra: payload.NgayTra,
            TrangThai: payload.TrangThai,
        };
    }

    // Tạo một bản ghi mượn sách mới
    async create(lendingData) {
        const document = this.extractData(lendingData);
        const result = await this.collection.insertOne(document);
        if (result.insertedCount === 0) {
            throw new Error('Failed to create lending record');
        }
        return document;
    }

    // Lấy danh sách tất cả các bản ghi mượn sách
    async getAll() {
        return await this.collection.find({}).toArray();
    }

    // Lấy thông tin chi tiết của một bản ghi mượn sách
    async getById(lendingCode) {
        return await this.collection.findOne({ MaMuonSach: lendingCode });
    }

    // Cập nhật thông tin bản ghi mượn sách
    async update(lendingCode, data) {
        const document = this.extractData(data);
        delete document.MaMuonSach;
        const result = await this.collection.findOneAndUpdate(
            { MaMuonSach: lendingCode },
            { $set: document },
            { returnDocument: 'after' }
        );
        if (!result) {
            throw new Error('Không tìm thấy bản ghi mượn sách');
        }
        return result;
    }

    // Xóa bản ghi mượn sách
    async delete(lendingCode) {
        const result = await this.collection.deleteOne({ MaMuonSach: lendingCode });
        if (result.deletedCount === 0) {
            throw new Error('Không tìm thấy bản ghi mượn sách để xóa');
        }
        return true;
    }

    // Xóa tất cả các bản ghi mượn sách
    async deleteAll() {
        const result = await this.collection.deleteMany({});
        return result.deletedCount > 0;
    }

    // Lấy danh sách mượn sách của một độc giả
    async getLendingsByReader(readerId) {
        return await this.collection.find({ MaDocGia: readerId }).toArray();
    }

    async getBookStatus(bookId) {
        const lending = await this.collection.findOne({ MaSach: bookId, TrangThai: 'Đang mượn' });
        return lending ? 'Đang mượn' : 'Có sẵn';
    }

    
}

module.exports = LendingService;