const { ObjectId } = require('mongodb'); // Import ObjectId từ thư viện mongodb để làm việc với các ID của tài liệu

class BookService {
    constructor(client) {
        this.bookCollection = client.db().collection("Sach"); // Khởi tạo đối tượng bookCollection để tương tác với collection "books" trong cơ sở dữ liệu
    }

    // Phương thức tạo mã sách tự động
    generateBookCode() {
        return 'BOOK-' + Math.random().toString(36).substr(2, 9).toUpperCase(); // Tạo mã sách ngẫu nhiên
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongo API
    extractBookData(payload) {
        const book = {
            MaSach: this.generateBookCode(), // Tạo mã sách mới
            TenSach: payload.TenSach, // Trích xuất trường TenSach từ payload
            DonGia: payload.DonGia, // Trích xuất trường DonGia từ payload
            NamXuatBan: payload.NamXuatBan, // Trích xuất trường NamXuatBan từ payload
            MaNhaXuatBan: payload.MaNhaXuatBan, // Trích xuất trường MaNhaXuatBan từ payload
            TacGia: payload.TacGia, // Trích xuất trường TacGia từ payload
            TrangThai: payload.TrangThai, // Trích xuất trường TrangThai từ payload
        };
        return book; // Trả về đối tượng book đã được trích xuất
    }

    // Tạo sách mới
    async create(bookData) {
        const book = this.extractBookData(bookData); // Trích xuất dữ liệu sách từ bookData
        const result = await this.bookCollection.insertOne(book); // Chèn tài liệu mới vào collection "books"
        if (result.insertedCount === 0) {
            throw new Error('Failed to create book'); // Ném lỗi nếu không chèn được tài liệu
        }
        return book; // Trả về tài liệu mới được tạo
    }

    // Lấy danh sách tất cả các sách
    async getAll() {
        const books = await this.bookCollection.find({}).toArray(); // Tìm tất cả các tài liệu trong collection "books" và chuyển đổi thành mảng
        return books; // Trả về danh sách các tài liệu
    }

    // Lấy thông tin chi tiết của một cuốn sách
    async getByBookCode(bookCode) {
        const book = await this.bookCollection.findOne({ MaSach: bookCode }); // Tìm một tài liệu trong collection "books" dựa trên MaSach
        return book; // Trả về tài liệu tìm thấy
    }

    // Cập nhật thông tin sách
    async update(bookCode, updateData) {
        const book = this.extractBookData(updateData); // Trích xuất dữ liệu sách từ updateData
        delete book.MaSach; // Loại bỏ trường MaSach khỏi dữ liệu cập nhật

        const result = await this.bookCollection.findOneAndUpdate(
            { MaSach: bookCode }, // Điều kiện để tìm tài liệu
            { $set: book }, // Sử dụng toán tử $set để cập nhật tài liệu
            { returnDocument: 'after' },// Trả về tài liệu sau khi cập nhật
        );

    
        if (!result) {
            throw new Error('Failed to update book'); // Ném lỗi nếu không tìm thấy tài liệu để cập nhật
        }

        return result; // Trả về tài liệu đã cập nhật
    }

    // Xóa sách
    async delete(bookCode) {
        const result = await this.bookCollection.deleteOne({ MaSach: bookCode }); // Xóa một tài liệu trong collection "books" dựa trên MaSach
        return result.deletedCount > 0; // Trả về true nếu xóa thành công, ngược lại trả về false
    }

    // Xóa tất cả sách
    async deleteAll() {
        const result = await this.bookCollection.deleteMany({}); // Xóa tất cả các tài liệu trong collection "books"
        return result.deletedCount > 0; // Trả về true nếu xóa thành công, ngược lại trả về false
    }
}

module.exports = BookService;