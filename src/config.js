require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://jordanlopez992@localhost/farmhouse",
    API_TOKEN: '1e272152-e43a-11ea-87d0-0242ac130003',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || "postgresql://jordanlopez992@localhost/farmhouse_test",
    JWT_SECRET: '4501118c-e1c1-11ea-87d0-0242ac130003',
    JWT_EXPIRY: '20s'
}