const express = require('express');
const staff = require('../controllers/staff.controller');

const router = express.Router();

router.route("/")
    .get(staff.findAll) // Lấy danh sách tất cả các nhân viên
    .post(staff.create) // Tạo một nhân viên mới
    .delete(staff.deleteAll); // Xóa tất cả nhân viên

router.route("/:staffCode")
    .get(staff.findOne) // Lấy thông tin chi tiết của một nhân viên
    .put(staff.update) // Cập nhật thông tin của một nhân viên
    .delete(staff.delete); // Xóa một nhân viên

module.exports = router;