const ApiError = require('../api-error');
const PublisherService = require('../services/publisher.service');
const MongoDB = require('../utils/mongodb.util');

// Phương thức tạo mới một nhà xuất bản mới
exports.create = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError('Dữ liệu không được để trống'));
    }
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const publisherService = new PublisherService(client); // Tạo một đối tượng Publisher
        const document = await publisherService.create(req.body); // Tạo một nhà xuất bản mới
        res.send(document); // Trả về thông tin nhà xuất bản mới
    } catch (error) {
        next(new ApiError(500, "Lỗi xảy ra trong khi tạo nhà xuất bản"));
        console.log(error);
    }
}

// Phương thức lấy thông tin chi tiết của một nhà xuất bản dựa trên mã nhà xuất bản
exports.findOne = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const publisherService = new PublisherService(client); // Tạo một instance của PublishService
        const document = await publisherService.getById(req.params.publisherCode); // Lấy thông tin chi tiết của một nhà xuất bản
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy nhà xuất bản'));
        }
        res.send(document); // Trả về thông tin nhà xuất bản
    }
    catch (error) {
        next(new ApiError(500, "Lỗi xảy ra trong khi lấy thông tin nhà xuất bản"));
        console.log(error);
    }
};
// Phương thức lấy danh sách tất cả các nhà xuất bản
exports.findAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const publisherService = new PublisherService(client); // Tạo một instance của PublishService
        const documents = await publisherService.getAll(); // Lấy danh sách tất cả các nhà xuất bản
        res.send(documents); // Trả về danh sách nhà xuất bản
    } catch (error) {
        next(new ApiError(500, "Lỗi xảy ra trong khi lấy danh sách nhà xuất bản"));
        console.log(error);
    }
};

// Phương thức cập nhật thông tin của một nhà xuất bản dựa trên mã nhà xuất bản
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Dữ liệu không được để trống'));
    }
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const publisherService = new PublisherService(client); // Tạo một instance của PublishService
        const document = await publisherService.update(req.params.publisherCode, req.body); // Cập nhật thông tin của một nhà xuất bản
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy nhà xuất bản'));
        }
        res.send(document); // Trả về thông tin nhà xuất bản sau khi cập nhật
    }
    catch (error) {
        next(new ApiError(500, 'Lỗi xảy ra trong khi cập nhật nhà xuất bản'));
        console.log(error);
    }
};

// Phương thức xóa một nhà xuất bản dựa trên mã nhà xuất bản
exports.delete = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const publisherService = new PublisherService(client); // Tạo một instance của PublishService
        const result = await publisherService.delete(req.params.publisherCode); // Xóa một nhà xuất bản
        if (!result) {
            return next(new ApiError(404, 'Không tìm thấy nhà xuất bản'));
        }
        res.send({ message: 'Xóa nhà xuất bản thành công' }); // Trả về thông báo xóa thành công
    }
    catch (error) {
        next(new ApiError(500, 'Lỗi xảy ra trong khi xóa nhà xuất bản'));
        console.log(error);
    }
}
// Phương thức xóa tất cả các nhà xuất bản
exports.deleteAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect(); // Kết nối đến MongoDB
        const publisherService = new PublisherService(client); // Tạo một instance của PublishService
        const result = await publisherService.deleteAll(); // Xóa tất cả các nhà xuất bản
        res.send({ message: 'Xóa tất cả nhà xuất bản thành công' }); // Trả về thông báo xóa thành công
    }
    catch (error) {
        next(new ApiError(500, 'Lỗi xảy ra trong khi xóa tất cả nhà xuất bản'));
        console.log(error);
    }
}
