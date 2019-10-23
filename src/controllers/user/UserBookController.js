const { LibraryBook } = require('../../models')
const { Op } = require("sequelize")

const logger = require('../../logger')

module.exports = {
  async total (req, res) {
    try {
      const lastId = await LibraryBook.findAll()
      res.send({
        lastId: lastId.length
      })
    } catch (error) {
      logger.error(`[UserBookController.js] : ${error}`)
      res.status(500).send({
        error: '에러 발생'
      })
    }
  },

  async books (req, res) {
    try {
      const { page } = req.body
      let offset = 0
      if (page > 1) {
        offset = 12 * (page - 1);
      }
      const books = await LibraryBook.findAll({
        offset,
        limit: 12
      })
      const parsedBooks = []
      books.forEach(element => {
        const parsedBook = {
          id: element.id,
          image: element.image,
          title: element.title,
          author: element.author,
          publisher: element.publisher
        }
        parsedBooks.push(parsedBook)
      })
      res.send(parsedBooks)
    } catch (error) {
      logger.error(`[UserBookController.js] : ${error}`)
      res.status(500).send({
        error: '도서들을 fetch 시도 하는 중에 에러 발생'
      })
    }
  },

  async search (req, res) {
    try {
      const { keyword } = req.body
      const searchResult = await LibraryBook.findAll({
        attributes: ['id', 'title'],
        where: {
          title: {
            [Op.like]: "%" + keyword + "%"
          }
        },
        limit: 10
      })
      res.send(searchResult)
    } catch (error) {
      logger.error(`[UserBookController.js] : ${error}`)
      res.status(500).send({
        error: '검색 중에 에러 발생'
      })
    }
  },

  async book (req, res) {
    try {
      const { id } = req.body
      const searchResult = await LibraryBook.findOne({
        where: {
          id: {
            [Op.eq]: id
          }
        }
      })
      res.send(searchResult)
    } catch (error) {
      logger.error(`[UserBookController.js] : ${error}`)
      res.status(500).send({
        error: '해당 도서가 존재하지 않음'
      })
    }
  }
}