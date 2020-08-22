const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')
const { expect } = require('chai')
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
                .expect(200, [])
        })

        context('Given realtors in database', () => {
            beforeEach('insert realtors', () => 
                helpers.seedFarmHousesTables(
                    db,
                    helpers.makeFarmHousesArray()
                )
            )

            it('responds with 200 and all of the realtors', () => {
                return supertest(app)
                    .get('/api/realtors')
                    .expect(200)
                    .then(async (res) => {
                        expect(res.body).to.be.an('array');
                        expect(res).to.have.nested.property('body[0]')
                        .that.includes.all.keys(['id', 'description', 'full_name', 'user_name', 'email', 'number'])
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
                    .expect(404, { error: { message: `Realtor doesn't exist`} })
            })
        })


    })
})