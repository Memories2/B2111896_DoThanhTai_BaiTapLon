const ApiError = require('../api-error');
const ReaderService = require('../services/reader.service');
const MongoDB = require('../utils/mongodb.util');

// Phương thức tạo mới một độc giả
exports.create = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Data can not be empty'));
    }

    try {
        const client = await MongoDB.connect();
        const readerService = new ReaderService(client);
        const document = await readerService.create(req.body);
        res.send(document);
    } catch (error) {
        next(new ApiError(500, "An error occurred while creating the reader"));
        console.log(error);
    }
};

// Phương thức lấy thông tin chi tiết của một độc giả dựa trên mã độc giả
exports.findOne = async (req, res, next) => {
    try {
        const client = await MongoDB.connect();
        const readerService = new ReaderService(client);
        const document = await readerService.getById(req.params.readerCode);
        if (!document) {
            return next(new ApiError(404, 'Reader not found'));
        }
        res.send(document);
    } catch (error) {
        next(new ApiError(500, "An error occurred while retrieving the reader"));
        console.log(error);
    }
};

// Phương thức lấy danh sách tất cả các độc giả
exports.findAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect();
        const readerService = new ReaderService(client);
        const documents = await readerService.getAll();
        res.send(documents);
    } catch (error) {
        next(new ApiError(500, "An error occurred while retrieving the readers"));
        console.log(error);
    }
};

// Phương thức cập nhật thông tin của một độc giả dựa trên mã độc giả
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const client = await MongoDB.connect();
        const readerService = new ReaderService(client);
        const document = await readerService.update(req.params.readerCode, req.body);
        if (!document) {
            return next(new ApiError(404, 'Reader not found'));
        }
        res.send(document);
    } catch (error) {
        next(new ApiError(500, "An error occurred while updating the reader"));
        console.log(error);
    }
};

// Phương thức xóa một độc giả dựa trên mã độc giả
exports.delete = async (req, res, next) => {
    try {
        const client = await MongoDB.connect();
        const readerService = new ReaderService(client);
        const result = await readerService.delete(req.params.readerCode);
        if (!result) {
            return next(new ApiError(404, 'Reader not found'));
        }
        res.send({ message: "Reader was deleted successfully!" });
    } catch (error) {
        next(new ApiError(500, "An error occurred while deleting the reader"));
        console.log(error);
    }
};

// Phương thức xóa tất cả độc giả
exports.deleteAll = async (req, res, next) => {
    try {
        const client = await MongoDB.connect();
        const readerService = new ReaderService(client);
        const result = await readerService.deleteAll();
        if (!result) {
            return next(new ApiError(404, 'Readers not found'));
        }
        res.send({ message: "All readers were deleted successfully!" });
    } catch (error) {
        next(new ApiError(500, "An error occurred while deleting all readers"));
        console.log(error);
    }
};