const ApiError = require('../api-error'); // Import lớp ApiError để xử lý lỗi
const BookService = require('../services/book.service'); // Import lớp BookService để tương tác với cơ sở dữ liệu
const MongoDB = require('../utils/mongodb.util'); // Import tiện ích MongoDB để kết nối cơ sở dữ liệu

// Phương thức tạo sách mới
exports.create = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Book data can not be empty')); // Kiểm tra nếu dữ liệu yêu cầu trống, trả về lỗi 400
    }

    try {
        const client = await MongoDB.connect(); // Kết nối tới MongoDB
        const bookService = new BookService(client); // Tạo một instance của BookService với client
        const document = await bookService.create(req.body); // Gọi phương thức create để tạo sách mới
        res.send(document); // Gửi tài liệu đã tạo về cho client
    } catch (error) {
        next(new ApiError(500, "An error occurred while creating the book")); // Xử lý lỗi và chuyển tiếp tới middleware xử lý lỗi
        console.log(error); // Ghi log lỗi ra console
    }
};

// Phương thức lấy thông tin chi tiết của một sách dựa trên mã sách
exports.findOne = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối tới MongoDB
        const bookService = new BookService(client); // Tạo một instance của BookService với client
        const document = await bookService.getByBookCode(req.params.bookCode); // Gọi phương thức getByBookCode để lấy thông tin sách
        res.send(document); // Gửi tài liệu đã tìm thấy về cho client
    } catch (error) {
        next(new ApiError(500, "An error occurred while finding the book")); // Xử lý lỗi và chuyển tiếp tới middleware xử lý lỗi
        console.log(error); // Ghi log lỗi ra console
    }
};

// Phương thức lấy danh sách tất cả các sách
exports.findAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối tới MongoDB
        const bookService = new BookService(client); // Tạo một instance của BookService với client
        const documents = await bookService.getAll(); // Gọi phương thức getAll để lấy danh sách sách
        res.send(documents); // Gửi danh sách tài liệu về cho client
    } catch (error) {
        next(new ApiError(500, "An error occurred while finding the books")); // Xử lý lỗi và chuyển tiếp tới middleware xử lý lỗi
        console.log(error); // Ghi log lỗi ra console
    }
};

// Phương thức cập nhật thông tin của một sách dựa trên mã sách
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Data to update can not be empty')); // Kiểm tra nếu dữ liệu cập nhật trống, trả về lỗi 400
    }

    try {
        const client = await MongoDB.connect(); // Kết nối tới MongoDB
        const bookService = new BookService(client); // Tạo một instance của BookService với client
        const document = await bookService.update(req.params.bookCode, req.body); // Gọi phương thức update để cập nhật sách dựa trên mã sách
        console.log(document); // Ghi log tài liệu đã cập nhật
        res.send(document); // Gửi tài liệu đã cập nhật về cho client
    } catch (error) {
        next(new ApiError(500, "An error occurred while updating the book")); // Xử lý lỗi và chuyển tiếp tới middleware xử lý lỗi
        console.log(error); // Ghi log lỗi ra console
    }
};

// Phương thức xóa một sách dựa trên mã sách
exports.delete = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối tới MongoDB
        const bookService = new BookService(client); // Tạo một instance của BookService với client
        const result = await bookService.delete(req.params.bookCode); // Gọi phương thức delete để xóa sách dựa trên mã sách
        if(!result) {
            return next(new ApiError(404, 'Book not found')); // Kiểm tra nếu không tìm thấy sách, trả về lỗi 404
        }
        res.send({ message: "Book was deleted successfully!" }); // Gửi thông báo thành công về cho client
    } catch (error) {
        next(new ApiError(500, "An error occurred while deleting the book")); // Xử lý lỗi và chuyển tiếp tới middleware xử lý lỗi
        console.log(error); // Ghi log lỗi ra console
    }
};

// Phương thức xóa tất cả các sách
exports.deleteAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối tới MongoDB
        const bookService = new BookService(client); // Tạo một instance của BookService với client
        const result = await bookService.deleteAll(); // Gọi phương thức deleteAll để xóa tất cả các sách
        res.send({ message: "All books were deleted successfully!" }); // Gửi thông báo thành công về cho client
    } catch (error) {
        next(new ApiError(500, "An error occurred while deleting all books")); // Xử lý lỗi và chuyển tiếp tới middleware xử lý lỗi
        console.log(error); // Ghi log lỗi ra console
    }
};