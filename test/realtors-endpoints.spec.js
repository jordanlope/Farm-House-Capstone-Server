const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')
const { expect } = require('chai')
const config = require('../src/config')
const { get } = require('../src/auth/auth-router')

describe('Realtors Endpoints', () => {
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

    // Get all realtors
    describe('GET /api/realtors', () => {
        context('Given no realtors', () => {
            return supertest(app)
                .get('/api/realtors')
                .set("Authorization", "Bearer " + config.API_TOKEN)
                .expect(200, [])
        })

        context('Given realtors in database', () => {
            const realtors = helpers.makeRealtorsArray()
            //const farmHouses = helpers.makeFarmHousesArray()
            beforeEach('insert Realtors', async function () {
                await db
                    .into('realtors')
                    .insert(realtors)
            })

            it('responds with 200 and all of the realtors', () => {
                return supertest(app)
                    .get('/api/realtors')
                    .set("Authorization", "Bearer " + config.API_TOKEN)
                    .expect(200)
                    .then(async (res) => {
                        expect(res.body).to.be.an('array');
                    })
            })
        })
    })
    
    //Get one realtor

    describe('GET /api/realtors/:realtor_id', () => {
        context('Given no realtor', () => {
            it('responds with 404', () => {
                const realtorId = 12345
                return supertest(app)
                    .get(`/api/realtors/${realtorId}`)
                    .set("Authorization", "Bearer " + config.API_TOKEN)
                    .expect(404, { error: { message: `Realtor doesn't exist`} })
            })
        })
    })
})