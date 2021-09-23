const FilmDto = require('../dtos/filmDto')
const FilmService = require('../services/collections/FilmService')

class FilmController {
    async getAll(req, res, next) {
        try {
            const films = []
            const collections = await FilmService.getAll()

            collections.forEach(el => {
                films.push(new FilmDto(el))
            })

            return res.json({films})
        } catch (e) {
            next(e)
        }
    }

    async getFilm(req, res, next) {
        try {
            let film = await FilmService.getFilm(req.params.filmId)
            film = film ? new FilmDto(film) : {}

            return res.json({film})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FilmController()