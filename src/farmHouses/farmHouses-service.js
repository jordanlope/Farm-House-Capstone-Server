const xss = require('xss')

const FarmHousesService = {
    getAllFarmHouses(db) { //Get all works well on Postman
        return db  
            .from('farmhouses AS house')
            .select(
                'house.id',
                'house.address',
                'house.description',
                'house.realtorid',
                'house.price',
                'house.rooms',
                'house.bathrooms',
                'house.sizesqft',
                db.raw(
                    `json_strip_nulls(
                        json_build_object(
                            'id', usr.id,
                            'full_name', usr.full_name,
                            'email', usr.email,
                            'user_name', usr.user_name,
                            'number', usr.number,
                            'description', usr.description
                        )
                    ) AS "realtor"`
                ),
            )
            .leftJoin(
                'realtors AS usr',
                'house.realtorid',
                'usr.id'
            )
    },

    insertHouse(db, newHouse) {
        return db
            .insert(newHouse)
            .into('farmhouses')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    
    getById(db, id) { // Get ID works well on Postman
        return FarmHousesService.getAllFarmHouses(db)
        .where('house.id', id)
        .first()
    },

    deleteHouse(db, id) { // Delete house works well on Postman
        return db.from('farmhouses')
            .where({ id })
            .first()
            .delete()
    },

    updateHouse(db, id, newHouseFields) { //Update house works well on Postman
        return db.from('farmhouses')
            .where({ id })
            .first()
            .update(newHouseFields)
    },

    serializeFarmHouse(house) {
        const { realtor } = house
        return {
            id: house.id,
            address: xss(house.address),
            description: xss(house.description),
            price: house.price,
            rooms: house.rooms,
            bathrooms: house.bathrooms,
            sizeSQFT: house.sizesqft,
            realtorId: house.realtorid,
            realtor: {
                id: realtor.id,
                full_name: xss(realtor.full_name),
                user_name: xss(realtor.user_name),
                email: xss(realtor.email),
                number: realtor.number,
                description: xss(realtor.description)
            },
        }
    },
}

module.exports = FarmHousesService