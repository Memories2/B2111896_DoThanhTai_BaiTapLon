const express = require('express'); // Import thư viện Express
const publishers = require('../controllers/publisher.controller'); // Import controller cho tài liệu publisher
const router = express.Router(); // Tạo một đối tượng router từ Express

// Định nghĩa các route cho 
router.route("/")
    .get(publishers.findAll) // Route để lấy danh sách tất cả các publisher
    .post(publishers.create) // Route để tạo một publisher mới
    .delete(publishers.deleteAll); // Route để xóa tất cả  publisher

router.route("/:publisherCode")
    .get(publishers.findOne) // Route để lấy thông tin chi tiết của một publisher
    .put(publishers.update) // Route để cập nhật thông tin của một publisher
    .delete(publishers.delete); // Route để xóa một publisher

module.exports = router; // Xuất đối tượng router để sử dụng trong các file khác