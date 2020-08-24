const helpers = require('./test-helpers')
const app = require('../src/app')
const supertest = require('supertest')
const { expect } = require('chai')
const config = require('../src/config')

describe('User Endpoints', () => {
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

    describe('POST /api/users', () => {
        context('Given invalid password', () => {
            return supertest(app)
                .post('/api/users')
                .set("Authorization", "Bearer " + config.API_TOKEN)
                .send({
                    password: 'invalid',
                    user_name: 'jordan_lopez',
                    full_name: 'Jordan Lopez',
                    email: 'jordanlopez992Gmal.com',
                    number: '263',
                    description: 'This is a test'
                }).expect(401)
        })
    })
})