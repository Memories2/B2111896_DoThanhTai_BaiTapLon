const ApiError = require('../api-error'); // Import lớp ApiError để xử lý lỗi
const ReaderService = require('../services/reader.service');
const StaffService = require('../services/staff.service');
const MongoDB = require('../utils/mongodb.util'); // Import tiện ích MongoDB để kết nối cơ sở dữ liệu

exports.login = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Account not be empty')); // Kiểm tra nếu dữ liệu yêu cầu trống, trả về lỗi 400
    }
    console.log(req.body);
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const { taikhoan, matkhau } = req.body; // Trích xuất tài khoản và mật khẩu từ dữ liệu yêu cầu

        if(!taikhoan || !matkhau) {
            return next(new ApiError(400, 'Account or password is not empty'));
        }

        // Kiểm tra nếu tài khoản bắt đầu bằng 'STAFF-'
        if (taikhoan.startsWith('STAFF-')) {
            const staffService = new StaffService(client);
            const staff = await staffService.getById(taikhoan);
            if (staff && staff.Password === matkhau) {
                res.send(staff);
            } else {
                res.send('Invalid username or password');
            }
        } 

         // Kiểm tra nếu tài khoản bắt đầu bằng 'READER-'
        else if (taikhoan.startsWith('READER-')) {
            const readerService = new ReaderService(client); // Tạo một instance của ReaderService
            const reader = await readerService.getById(taikhoan); // Lấy thông tin độc giả dựa trên mã độc giả
            if (reader && reader.PassWord === matkhau) {
                res.send(reader);
            } else {
                res.send('Invalid username or password');
            }
        }
        // Nếu không phải là tài khoản của độc giả hoặc nhân viên
        else {
            res.send('Invalid username or password');
        }
    } catch (error) {
        next(new ApiError(500, "An erro happen when valid account")); // Xử lý lỗi và chuyển tiếp tới middleware xử lý lỗi
        console.log(error); // Ghi log lỗi ra console
    }
};

// Phương thức đăng ký nhan viên
exports.registerStaff = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Data can not be empty'));
    }

    try {
        const client = await MongoDB.connect();
        const staffService = new StaffService(client);
        const document = await staffService.create(req.body);
        res.send(document);
    } catch (error) {
        next(new ApiError(500, "An error occurred while creating the staff"));
        console.log(error);
    }
}

// Phương thức đăng ký độc giả

exports.registerReader = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Data can not be empty'));
    }

    try {
        const client = await MongoDB.connect();
        const readerService = new ReaderService(client);
        const document = await readerService.create(req.body);
        res.send(document);

    } catch (error) {
        next(new ApiError(500, "An error occurred while creating the staff"));
        console.log(error);
    }
}