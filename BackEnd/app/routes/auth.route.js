const express = require('express'); // Import thư viện Express
const auth = require('../controllers/auth.controller'); // Import controller cho tài liệu book

const router = express.Router(); // Tạo một đối tượng router từ Express

// Định nghĩa các route cho tài liệu book
router.route("/login")
    .post(auth.login)

router.route("/register/staff")
    .post(auth.registerStaff)

router.route("/register/reader")
    .post(auth.registerReader)

module.exports = router; 