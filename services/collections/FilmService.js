const db = require('../../models')
const Film = db.Film

class FilmService {
    async getAll() {
        return await Film.findAll()
    }

    async getFilm(filmId) {
        return await Film.findOne({where: {id: filmId}})
    }
}

module.exports = new FilmService()