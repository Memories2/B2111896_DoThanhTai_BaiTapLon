const express = require('express'); // Import thư viện Express
const books = require('../controllers/book.controller'); // Import controller cho tài liệu book

const router = express.Router(); // Tạo một đối tượng router từ Express

// Định nghĩa các route cho tài liệu book
router.route("/")
    .get(books.findAll) // Route để lấy danh sách tất cả các sách
    .post(books.create) // Route để tạo một sách mới
    .delete(books.deleteAll); // Route để xóa tất cả các sách

router.route("/:bookCode")
    .get(books.findOne) // Route để lấy thông tin chi tiết của một sách dựa trên ID
    .put(books.update) // Route để cập nhật thông tin của một sách dựa trên ID
    .delete(books.delete); // Route để xóa một sách dựa trên ID

module.exports = router; // Xuất đối tượng router để sử dụng trong các file khác