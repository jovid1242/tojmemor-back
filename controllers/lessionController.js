const LessionDto = require('../dtos/lessionDto')
const LessionService = require('../services/course/LessionService')


class LessionController {
    async getAll(req, res, next) {
        try {
            const lessions = []
            const collections = await LessionService.getAll(req.params.courseId)

            collections.forEach(el => {
                lessions.push(new LessionDto(el))
            })

            return res.json({lessions})
        } catch (e) {
            next(e)
        }
    }

    async getLession(req, res, next) {
        try {
            let lession = await LessionService.getLession(req.params.lessionId)
            lession = lession ? new LessionDto(lession) : {}

            return res.json({
                lession
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new LessionController()