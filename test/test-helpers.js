

function makeFarmHousesArray() {
    return [
        {
            id: 1,
            address: '436278 Farmville, Philadelphia, PA 29018',
            description: 'nim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima v',
            realtorid: 2,
            rooms: 4,
            bathrooms: 4,
            sizesqft: 2000,
            price: 300000
        },
        {
            id: 2,
            address: '4526 Hatsboil, Haverford, PA 22219',
            description: 'builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are',
            realtorid: 2,
            rooms: 4,
            bathrooms: 4,
            sizesqft: 2000,
            price: 500000
        },
        {
            id: 3,
            address: '2600 Loildale, Harrisburg, PA 28188',
            description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam e',
            realtorid: 1,
            rooms: 4,
            bathrooms: 4,
            sizesqft: 2000,
            price: 750000
        },
        {
            id: 4,
            address: '3400 Qator, Voncent, PA 382892',
            description: 'vident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum solut',
            realtorid: 1,
            rooms: 4,
            bathrooms: 4,
            sizesqft: 2000,
            price: 450000
        }
    ]
}

function makeRealtorsArray() {
    return [
        {
            id: 1,
            full_name: "Jordan Lopez",
            user_name: "jordanlopez992",
            email: "jlopez@gmail.com",
            password: 'Test1',
            number: 267,
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        },
        {
            id: 2,
            full_name: "Luis Brown",
            user_name: "LBrown",
            email: "lBrown@gmail.com",
            password: 'Test1',
            number: 268,
            description: 'Et harum quidem rerum facilis est et expedita distinctio.'
        }
    ]
}

function getRealtors(db) {
    return db  
    .select('*')
    .from('realtors')
}

function getFarmHouses(db) {
    return db  
    .select('*')
    .from('farmhouses')
}

function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          farmHouses,
          realtors,
          clients`
      )
      .then((res) => console.log("Truncated")
      )
    )
}

async function seedFarmHousesTable(db) {
    const farmHouses = helpers.makeFarmHousesArray()

    await db
        .into('farmhouses')
        .insert(farmHouses)
}

async function seedRealtorsTable(db) {
    const realtors = helpers.makeRealtorsArray()

    await db
    .into('realtors')
    .insert(realtors)
}

module.exports = {
    makeFarmHousesArray,
    makeRealtorsArray,
    getRealtors,
    getFarmHouses,
    cleanTables,
    seedFarmHousesTable,
    seedRealtorsTable
}