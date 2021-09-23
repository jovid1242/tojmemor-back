const db = require('../../models')
const Lession = db.Lession

class LessionService {
    async getAll(courseId) {
        return await Lession.findAll({where: {courseId}})
    }

    async getLession(lessionId) {
        return await Lession.findOne({where: {id: lessionId}})
    }
}

module.exports = new LessionService()