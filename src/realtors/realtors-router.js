const express = require('express')
const RealtorsService = require('./realtors-service')
const xss = require('xss')
const { requireAuth } = require('../middleware/jwt-auth')

const jsonParser = express.json()
const realtorsRouter = express.Router()

realtorsRouter
    .route('/')
    .get((req, res, next) => { //works on Postman
        RealtorsService.getAllRealtors(req.app.get('db'))
            .then(realtors => {
                res.json(realtors)
            }).catch(next)
    })

realtorsRouter
    .route('/:realtor_id')
    .all(checkRealtorExists)
    .get((req, res, next) => { //works on Postman
        res.json(res.realtor)
    })

async function checkRealtorExists(req, res, next) {
    try {
        const realtor = await RealtorsService.getById(
            req.app.get('db'),
            req.params.realtor_id
        )

        if(!realtor) 
            return res.status(404).json({
                error: { message: `Realtor doesn't exist` }
            })

        res.realtor = realtor
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = realtorsRouter