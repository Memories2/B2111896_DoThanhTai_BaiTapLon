const { ObjectId } = require('mongodb');

class StaffService {
    constructor(client) {
        this.collection = client.db().collection("NhanVien"); // Khởi tạo đối tượng collection để tương tác với collection "NhanVien" trong cơ sở dữ liệu
    }

    // Tạo mã nhân viên ngẫu nhiên
    generateStaffCode() {
        return 'STAFF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Trích xuất dữ liệu từ payload
    extractData(payload) {
        return {
            MSNV: this.generateStaffCode(),
            HoTenNV: payload.HoTenNV,
            Password: payload.Password,
            ChucVu: payload.ChucVu,
            DiaChi: payload.DiaChi,
            SoDienThoai: payload.SoDienThoai,
        };
    }

    // Tạo một nhân viên mới
    async create(staffData) {
        const document = this.extractData(staffData);
        const result = await this.collection.insertOne(document);
        if (result.insertedCount === 0) {
            throw new Error('Failed to create staff');
        }
        return document;
    }

    // Lấy danh sách tất cả các nhân viên
    async getAll() {
        return await this.collection.find({}).toArray();
    }

    // Lấy thông tin chi tiết của một nhân viên
    async getById(staffCode) {
        return await this.collection.findOne({ MSNV: staffCode });
    }

    // Cập nhật thông tin nhân viên
    async update(staffCode, data) {
        const document = this.extractData(data);
        delete document.MSNV;
        const result = await this.collection.findOneAndUpdate(
            { MSNV: staffCode },
            { $set: document },
            { returnDocument: 'after' },
        );
        if (!result) {
            throw new Error('Failed to update staff');
        }
        return result
    }

    // Xóa nhân viên
    async delete(staffCode) {
        const result = await this.collection.deleteOne({ MSNV: staffCode });
        return result.deletedCount > 0;
    }

    // Xóa tất cả nhân viên
    async deleteAll() {
        const result = await this.collection.deleteMany({});
        return result.deletedCount > 0;
    }
}

module.exports = StaffService;