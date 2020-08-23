const express = require('express')
const xss = require('xss')
const FarmHousesService = require('./farmHouses-service')

const farmHousesRouter = express.Router()
const jsonParser = express.json()

farmHousesRouter
    .route('/')
    .get((req, res, next) => {
        FarmHousesService.getAllFarmHouses(req.app.get('db'))
            .then(houses => {
                res.json(houses.map(FarmHousesService.serializeFarmHouse))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { address, description, price, rooms, bathrooms, sizesqft, realtorid } = req.body

        const newHouse = {
            address: xss(address), 
            description: xss(description), 
            price: xss(price), 
            rooms: xss(rooms), 
            bathrooms: xss(bathrooms), 
            sizesqft: xss(sizesqft), 
            realtorid 
        }

        for (const [key, value] of Object.entries(newHouse))
            if(value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })

        FarmHousesService.insertHouse(
            req.app.get('db'),
            newHouse
        ).then(house => {
            res
                .status(201)
                .json(house)
        }).catch(next)
    })

farmHousesRouter
    .route('/:farmHouseId')
    .all((req, res, next) => {
        FarmHousesService.getById(
            req.app.get('db'),
            req.params.farmHouseId
        ).then(house => {
            if (!house) {
                return res.status(404).json({
                    error: { message: `House doesn't exist` }
                })
            }
            res.house = house
            next()
        }).catch(next)
    })
    .get((req, res, next) => {
        res.json(res.house)
    })
    .delete((req, res, next) => {
        console.log('Farm House Id', req.params.farmHouseId)
        FarmHousesService.deleteHouse(
            req.app.get('db'),
            req.params.farmHouseId
        ).then(numRowsAffected => {
            res.status(204).end()
        }).catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { address, description, price, rooms, bathrooms, sizeSQFT, realtorId } = req.body
        const houseToUpdate = { 
            address, 
            description, 
            price, 
            rooms, 
            bathrooms, 
            sizesqft: sizeSQFT, 
            realtorid: realtorId
        }

        FarmHousesService.updateHouse(
            req.app.get('db'),
            req.params.farmHouseId,
            houseToUpdate
        ).then(numRowsAffected => {
            res.json('Successful').status(204).end()
        }).catch(next)
    })

module.exports = farmHousesRouter