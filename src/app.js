require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const farmHousesRouter = require('./farmHouses/farmHouses-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const realtorsRouter = require('./realtors/realtors-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/farmHouses', farmHousesRouter)
app.use('/api/realtors', realtorsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN

    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        logger.error(`Unauthorized request to path: ${req.path}`);
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    // move to the next middleware
    next()
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app
