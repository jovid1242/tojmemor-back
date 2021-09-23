const CourseDto = require('../dtos/courseDto')
const CourseService = require('../services/course/CourseService')

class CourseController {
    async getAll(req, res, next) {
        try {
            const courses = []
            const collections = await CourseService.getAll()

            collections.forEach(el => {
                courses.push(new CourseDto(el))
            })

            return res.json({courses})
        } catch (e) {
            next(e)
        }
    }

    async getCourse(req, res, next) {
        try {
            let course = await CourseService.getCourse(req.params.courseId)
            course = course ? new CourseDto(course) : {}

            return res.json({course})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CourseController()