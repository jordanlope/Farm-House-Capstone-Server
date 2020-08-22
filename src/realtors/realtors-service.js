const xss = require('xss')

const RealtorsService = {
    
    getAllRealtors(db) {
        return db
            .from('realtors')
            .select('*')
    },

    getById(db, id) {
        return RealtorsService.getAllRealtors(db)
            .where({ id })
            .first()
    }
}

module.exports = RealtorsService