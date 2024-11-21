const express = require('express');
const lendings = require('../controllers/lending.controller');

const router = express.Router();

// Định nghĩa các route cho tài liệu lending
router.route("/")
    .get(lendings.findAll) // Route để lấy danh sách tất cả các bản ghi mượn sách
    .post(lendings.create) // Route để tạo một bản ghi mượn sách mới
    .delete(lendings.deleteAll); // Route để xóa tất cả các bản ghi mượn sách

router.route("/:id")
    .get(lendings.findOne) // Route để lấy thông tin chi tiết của một bản ghi mượn sách
    .put(lendings.update) // Route để cập nhật thông tin của một bản ghi mượn sách
    .delete(lendings.delete); // Route để xóa một bản ghi mượn sách

router.route("/reader/:readerId")
    .get(lendings.getLendingsByReaderId); // Route để lấy danh sách mượn sách của một độc giả

module.exports = router;