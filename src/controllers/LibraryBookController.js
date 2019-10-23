const { LibraryBook, Serial } = require('../models')
const logger = require('../logger')

module.exports = {
  async index (req, res) {
    try {
      const { page } = req.body
      let offset = 0
      if (page > 1) {
        offset = 10 * (page - 1);
      }
      const books = await LibraryBook.findAll({
        offset,
        limit: 10
      })
      for (let i = 0; i < books.length; i++) {
        const bookId = books[i].id
        const serials = await Serial.findAll({
          where: {
            book_id: bookId
          }
        })
        books[i].dataValues.count = serials.length
      }
      res.send(books)
    } catch (error) {
      logger.error(`[LibraryBookController.js] : ${error}`)
      res.status(500).send({
        error: '도서들을 fetch 시도 하는 중에 에러 발생'
      })
    }
  },

  async total (req, res) {
    try {
      const lastId = await LibraryBook.findAll()
      res.send({
        lastId: lastId.length
      })
    } catch (error) {
      logger.error(`[LibraryBookController.js] : ${error}`)
      res.status(500).send({
        error: '에러 발생'
      })
    }
  },

  async bookRegister (req, res) {
    try {
      const { image, title, author, publisher, isbn, desc } = req.body
      const book = await LibraryBook.create({
        image,
        title,
        author,
        publisher,
        isbn,
        desc
      })
      const bookJson = book.toJSON()
      res.send({
        message: `[${bookJson.title}] 등록 성공`
      })
    } catch (error) {
      logger.error(`[LibraryBookController.js] : ${error}`)
      res.status(400).send({
        error: '등록 실패'
      })
    }
  }
}