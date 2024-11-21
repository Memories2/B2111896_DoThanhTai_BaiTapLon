const express = require("express");
const booksRouter = require("./app/routes/book.route");
const publishersRouter = require("./app/routes/publisher.route"); // Import route cho publisher
const staffsRouter = require("./app/routes/staff.route"); // Import route cho staff
const readersRouter = require("./app/routes/reader.route"); // Import route cho reader
const lendingsRouter = require("./app/routes/lending.route"); // Import route cho lending
const authRouter = require("./app/routes/auth.route"); // Import route cho lending
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/books", booksRouter);
app.use("/api/v1/publishers", publishersRouter); // Thêm route cho publisher
app.use("/api/v1/staffs", staffsRouter); // Thêm route cho staff
app.use("/api/v1/readers", readersRouter); // Thêm route cho reader
app.use("/api/v1/lendings", lendingsRouter); // Thêm route cho lending
app.use("/api/v1/auth", authRouter); // Thêm route cho lending

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});



// Error handler
app.use((req, res, next) => {
  console.log("Error handler", err);
  // Code ở đây sẽ chạy khi không có route nào match với request
  // khớp với yêu cầu. Gọi next với một instance của ApiError để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Not Found"));
});

// Định nghĩa middleware xử lý lỗi, sau tất cả các route khác
app.use((err, req, res, next) => {
  // Xử lý lỗi tập trung
  // Trong các đoạn code xử lý ở các route, gọi next với một instance của ApiError để chuyển sang middleware này
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;