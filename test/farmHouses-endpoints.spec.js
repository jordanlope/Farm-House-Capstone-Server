const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')
const { expect } = require('chai')
const config = require('../src/config')

describe('FarmHouses Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: "postgresql://jordanlopez992@localhost/farmhouse_test"
        })

        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /api/farmHouses/:farmHouseId', () => {
        context('Given no farmHouse', () => {
            it('responds with 404', () => {
                const farmHouseId = 12345
                return supertest(app)
                    .get(`/api/farmHouses/${farmHouseId}`)
                    .set("Authorization", "Bearer " + config.API_TOKEN)
                    .expect(404, { error: { message: `House doesn't exist`} })
            })
        })

        context('Given there are farmHouses in the database', () => {
            const realtors = helpers.makeRealtorsArray()
            const farmHouses = helpers.makeFarmHousesArray()
            beforeEach('insert Realtors', async function () {
                await db
                    .into('realtors')
                    .insert(realtors)
                await db
                    .into('farmhouses')
                    .insert(farmHouses)
            })

            it('responds with 200 and the specified farmHouse', () => {

                helpers.getRealtors(db).then(data => {
                    console.log("Realtors: ")
                    console.log(data)
                }).catch(error => console.log(error))

                helpers.getFarmHouses(db).then(data => {
                    console.log("Farm Houses: ")
                    console.log(data)
                }).catch(error => console.log(error))

                const farmHouses = helpers.makeFarmHousesArray()
                const farmHouseId = farmHouses[0].id
                return supertest(app)
                    .get(`/api/farmHouses/${farmHouseId}`)
                    .set("Authorization", "Bearer " + config.API_TOKEN)
                    .expect(200)
            })
        })
    })

    describe('GET /api/farmHouses', () => {
        context('Given no farmHouses', () => {
            it('Responds with 200 with empty list', () => {
                return supertest(app)
                    .get('/api/farmHouses')
                    .set("Authorization", "Bearer " + config.API_TOKEN)
                    .expect(200, [])
            })
        })

        context('Given there are farmhouses in the database', () => {
            const realtors = helpers.makeRealtorsArray()
            const farmHouses = helpers.makeFarmHousesArray()
            beforeEach('insert Realtors', async function () {
                await db
                    .into('realtors')
                    .insert(realtors)
                await db
                    .into('farmhouses')
                    .insert(farmHouses)
            })

            it('responds with 200 and all of the farmHouse', () => {

                helpers.getRealtors(db).then(data => {
                    console.log("Realtors: ")
                    console.log(data)
                }).catch(error => console.log(error))

                helpers.getFarmHouses(db).then(data => {
                    console.log("Farm Houses: ")
                    console.log(data)
                }).catch(error => console.log(error))

                return supertest(app)
                    .get('/api/farmHouses')
                    .set("Authorization", "Bearer " + config.API_TOKEN)
                    .expect(200)
                    .then(async (res) => {
                        expect(res.body).to.be.an('array');
                    })
            })
        })
    })

    describe('POST /api/farmHouses', () => {
        const realtors = helpers.makeRealtorsArray()
        const farmHouses = helpers.makeFarmHousesArray()
        beforeEach('insert Realtors and Farm Houses', async function () {
            await db
                .into('realtors')
                .insert(realtors)
            await db
                .into('farmhouses')
                .insert(farmHouses)
        })

        it('creates a farmHouse, responding with 201 and the new farmHouse', () => {
            const farmHouses = helpers.makeFarmHousesArray()
            const realtorId = farmHouses[1].realtorid

            return supertest(app)
                .post('/api/farmHouses')
                .set("Authorization", "Bearer " + config.API_TOKEN)
                .send({
                    address: "Test 22",
                    description: "vident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum solut",
                    realtorid: realtorId,
                    rooms: 5,
                    bathrooms: 7,
                    sizesqft: 4000,
                    price: 500000 
                })
                .expect(201)
        })
    })

    describe('DELETE /api/farmHouses/:farmHouseId', () => {
        const realtors = helpers.makeRealtorsArray()
        const farmHouses = helpers.makeFarmHousesArray()
        beforeEach('insert Realtors and Farm Houses', async function () {
            await db
                .into('realtors')
                .insert(realtors)
            await db
                .into('farmhouses')
                .insert(farmHouses)
        })

        it('Deletes a farmHouse, responding with 201 and the new farmHouse', () => {
            const farmHouses = helpers.makeFarmHousesArray()
            const farmHouseId = farmHouses[1].id

            return supertest(app)
                .delete(`/api/farmHouses/${farmHouseId}`)
                .set("Authorization", "Bearer " + config.API_TOKEN)
                .expect(204)
        })
    })

    describe('PATCH /api/farmHouses/:farmHouseId', () => {
        const realtors = helpers.makeRealtorsArray()
        const farmHouses = helpers.makeFarmHousesArray()
        beforeEach('insert Realtors and Farm Houses', async function () {
            await db
                .into('realtors')
                .insert(realtors)
            await db
                .into('farmhouses')
                .insert(farmHouses)
        })

        it('Updates a farmHouse, responding with 201 and the new farmHouse', () => {
            const farmHouses = helpers.makeFarmHousesArray()
            const farmHouseId = farmHouses[0].id

            return supertest(app)
                .patch(`/api/farmHouses/${farmHouseId}`)
                .set("Authorization", "Bearer " + config.API_TOKEN)
                .send({
                    address: '3400 Qator, Voncent, PA 382892',
                    description: 'vident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum solut',
                    realtorid: 1,
                    rooms: 4,
                    bathrooms: 4,
                    sizesqft: 2000,
                    price: 450000
                })
                .expect(200)
        })
    })
})