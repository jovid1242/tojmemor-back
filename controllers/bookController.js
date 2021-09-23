const {validationResult} = require('express-validator')
const BookDto = require('../dtos/bookDto')
const ApiError = require('../exceptions/apiError')
const BookService = require('../services/collections/BookService')

class BookController {
    async getAll(req, res, next) {
        try {
            const books = []
            const collections = await BookService.getAll()

            collections.forEach(el => {
                books.push(new BookDto(el))
            })

            return res.json({books})
        } catch (e) {
            next(e)
        }
    }
    
    async getBook(req, res, next) {
        try {
            let book = await BookService.getBook(req.params.bookId)
            book = book ? new BookDto(book) : {}

            return res.json({book})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new BookController()