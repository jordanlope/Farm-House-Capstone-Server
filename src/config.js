require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL,
    DB_URL_TEST: process.env.DB_URL_TEST,
    JWT_SECRET: '4501118c-e1c1-11ea-87d0-0242ac130003',
    JWT_EXPIRY: '20s'
}