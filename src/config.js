require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: "postgresql://jordanlopez992@localhost/farmhouse",
    DB_URL_TEST: process.env.DB_URL_TEST
}