const ApiError = require('../api-error');
const LendingService = require('../services/lending.service');
const MongoDB = require('../utils/mongodb.util');


// Phương thức tạo mới một bản ghi mượn sách
exports.create = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Data can not be empty'));
    }

    try {
        const client = await MongoDB.connect();
        const lendingService = new LendingService(client);
        const document = await lendingService.create(req.body);
        res.send(document);
    } catch (error) {
        next(new ApiError(500, "An error occurred while creating the lending record"));
        console.log(error);
    }
};


// Lấy danh sách mượn sách của một độc giả
exports.getLendingsByReaderId = async (req, res, next) => {
    try {
        const client = await MongoDB.connect();
        const lendingService = new LendingService(client);
        const lendings = await lendingService.getLendingsByReader(req.params.readerId);
        res.send(lendings);
    } catch (error) {
        next(new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách mượn sách"));
        console.log(error);
    }
};



// Phương thức lấy thông tin chi tiết của một bản ghi mượn sách dựa trên mã mượn sách
exports.findOne = async (req, res, next) => {
    try {
        const client = await MongoDB.connect();
        const lendingService = new LendingService(client);
        const document = await lendingService.getById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Lending record not found'));
        }
        res.send(document);
    } catch (error) {
        next(new ApiError(500, "An error occurred while retrieving the lending record"));
        console.log(error);
    }
};

// Phương thức lấy danh sách tất cả các bản ghi mượn sách
exports.findAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect();
        const lendingService = new LendingService(client);
        const documents = await lendingService.getAll();
        return res.send(documents);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách mượn sách"));
    }
};

// Phương thức cập nhật thông tin của một bản ghi mượn sách dựa trên mã bản ghi
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Dữ liệu cập nhật không thể trống'));
    }

    try {
        const client = await MongoDB.connect();
        const lendingService = new LendingService(client);
        const document = await lendingService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy bản ghi mượn sách'));
        }
        res.send(document);
    } catch (error) {
        next(new ApiError(500, "Đã xảy ra lỗi khi cập nhật bản ghi mượn sách"));
        console.log(error);
    }
};

// Phương thức xóa một bản ghi mượn sách dựa trên mã mượn sách
exports.delete = async (req, res, next) => {
    try {
        const client = await MongoDB.connect();
        const lendingService = new LendingService(client);
        const result = await lendingService.delete(req.params.id);
        if (!result) {
            return next(new ApiError(404, 'Không tìm thấy bản ghi mượn sách'));
        }
        res.send({ message: "Xóa bản ghi mượn sách thành công!" });
    } catch (error) {
        next(new ApiError(500, "Đã xảy ra lỗi khi xóa bản ghi mượn sách"));
        console.log(error);
    }
};

// Phương thức xóa tất cả các bản ghi mượn sách
exports.deleteAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect();
        const lendingService = new LendingService(client);
        const result = await lendingService.deleteAll();
        if (!result) {
            return next(new ApiError(404, 'Không tìm thấy bản ghi mượn sách nào'));
        }
        res.send({ message: "Đã xóa tất cả bản ghi mượn sách thành công!" });
    } catch (error) {
        next(new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả bản ghi mượn sách"));
        console.log(error);
    }
}




