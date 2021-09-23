const db = require('../../models')
const Book = db.Book

class BookService {
    async getAll() {
        return await Book.findAll()
    }

    async getBook(bookId) {
        return await Book.findOne({where: {id: bookId}})
    }
}

module.exports = new BookService()