const ApiError = require('../api-error');
const StaffService = require('../services/staff.service');
const MongoDB = require('../utils/mongodb.util');

// Phương thức tạo mới một nhân viên
exports.create = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Data can not be empty'));
    }

    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const staffService = new StaffService(client); // Tạo một đối tượng StaffService
        const document = await staffService.create(req.body); // Tạo một nhân viên mới
        res.send(document); // Trả về thông tin nhân viên mới
    } catch (error) {
        next(new ApiError(500, "An error occurred while creating the staff"));
        console.log(error);
    }
};

// Phương thức lấy thông tin chi tiết của một nhân viên dựa trên mã nhân viên
exports.findOne = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const staffService = new StaffService(client); // Tạo một instance của StaffService
        const document = await staffService.getById(req.params.staffCode); // Lấy thông tin chi tiết của một nhân viên
        if (!document) {
            return next(new ApiError(404, 'Staff not found'));
        }
        res.send(document); // Trả về thông tin nhân viên
    } catch (error) {
        next(new ApiError(500, "An error occurred while retrieving the staff"));
        console.log(error);
    }
};

// Phương thức lấy danh sách tất cả các nhân viên
exports.findAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const staffService = new StaffService(client); // Tạo một instance của StaffService
        const documents = await staffService.getAll(); // Lấy danh sách tất cả các nhân viên
        res.send(documents); // Trả về danh sách nhân viên
    } catch (error) {
        next(new ApiError(500, "An error occurred while retrieving the staff"));
        console.log(error);
    }
};

// Phương thức cập nhật thông tin của một nhân viên dựa trên mã nhân viên
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const staffService = new StaffService(client); // Tạo một instance của StaffService
        const document = await staffService.update(req.params.staffCode, req.body); // Cập nhật thông tin nhân viên
        if (!document) {
            return next(new ApiError(404, 'Staff not found'));
        }
        res.send(document); // Trả về thông tin nhân viên đã cập nhật
    } catch (error) {
        next(new ApiError(500, "An error occurred while updating the staff"));
        console.log(error);
    }
};

// Phương thức xóa một nhân viên dựa trên mã nhân viên
exports.delete = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const staffService = new StaffService(client); // Tạo một instance của StaffService
        const result = await staffService.delete(req.params.staffCode); // Xóa nhân viên
        if (!result) {
            return next(new ApiError(404, 'Staff not found'));
        }
        res.send({ message: "Staff was deleted successfully!" }); // Trả về thông báo thành công
    } catch (error) {
        next(new ApiError(500, "An error occurred while deleting the staff"));
        console.log(error);
    }
};
// Phương thức xóa tất cả nhân viên
exports.deleteAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const staffService = new StaffService(client); // Tạo một instance của StaffService
        const result = await staffService.deleteAll(); // Xóa tất cả nhân viên
        if (!result) {
            return next(new ApiError(404, 'Staff not found'));
        }
        res.send({ message: "All staffs were deleted successfully!" }); // Trả về thông báo thành công
    } catch (error) {
        next(new ApiError(500, "An error occurred while deleting all staffs"));
        console.log(error);
    }
};