const express = require('express');
const readers = require('../controllers/reader.controller');

const router = express.Router();

// Định nghĩa các route cho tài liệu reader
router.route("/")
    .get(readers.findAll) // Route để lấy danh sách tất cả các độc giả
    .post(readers.create) // Route để tạo một độc giả mới
    .delete(readers.deleteAll); // Route để xóa tất cả các độc giả

router.route("/:readerCode")
    .get(readers.findOne) // Route để lấy thông tin chi tiết của một độc giả
    .put(readers.update) // Route để cập nhật thông tin của một độc giả
    .delete(readers.delete); // Route để xóa một độc giả

module.exports = router;