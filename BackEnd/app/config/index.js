const config = {
    app: {
        port: process.env.PORT || 3000, 
    },
    db: {
        uri: process.env.DB_URL || "mongodb://localhost:27017/booksmanagement",
    },
};

module.exports = config;