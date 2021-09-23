const db = require('../../models')
const Course = db.Course

class CourseService {
    async getAll() {
        return await Course.findAll({include: 'Lession'})
    }

    async getCourse(courseId) {
        return await Course.findOne({where: {id: courseId}, include: 'Lession'})
    }
}

module.exports = new CourseService()