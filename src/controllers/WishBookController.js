const { WishBook, LibraryBook, User } = require('../models')
const logger = require('../logger')
const SlackBotEvent = require('../api/SlackBotEvent')

function parseTitle(title) {
  if (title.length >= 25) {
    return title.substring(0, 25) + '...'
  }
  return title
}

module.exports = {
  async requestBook (req, res) {
    try {
      const { image, title, author, publisher, isbn, description } = req.body.book
      const { user_id } = req.body
      const book = await LibraryBook.findOne({
        where: {
          isbn: isbn
        }
      })
      if (book) {
        logger.info(`[WishBookController.js] : ${book}`)
        res.status(400).send({
          error: '현재 비치된 도서입니다.'
        })
        return
      }
      const request = await WishBook.create({
        image,
        title,
        author,
        publisher,
        isbn,
        desc: description,
        user_id
      })
      const requestJson = request.toJSON()
      SlackBotEvent.notifyNewWishBook(requestJson)
        .catch(error => {
          logger.info(`[SlackBotEvent.notifyNewWishBook] : ${error}`)
        })
      res.send({
        message: `[${parseTitle(requestJson.title)}] 신청 성공`
      })
    } catch (error) {
      logger.error(`[WishBookController.js] : ${error}`)
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).send({
          error: '이미 신청된 도서입니다.'
        })
      }
      res.status(400).send({
        error: '등록 실패'
      })
    }
  },

  async requestList (req, res) {
    try {
      const requests = await WishBook.findAll()
      const parsedRequests = []
      for (let i = 0; i < requests.length; i++) {
        const element = requests[i]
        const user = await User.findOne({
          where: {
            id: element.user_id
          }
        })
        const parsedRequest = {
          id: element.id,
          title: element.title,
          isbn: element.isbn,
          author: element.author,
          publisher: element.publisher,
          user: user.name,
        }
        parsedRequests.push(parsedRequest)
      }
      res.send(parsedRequests)
    } catch (error) {
      logger.error(`[WishBookController.js] : ${error}`)
      res.status(404).send({
        error: error
      })
    }
  },

  async register(req, res) {
    try {
      const { id } = req.body
      const requestedBook = await WishBook.findOne({ where: { id } })
      await WishBook.destroy({ where: { id } })
      const { image, title, author, publisher, isbn, desc } = requestedBook
      const book = await LibraryBook.create({
        image,
        title,
        author,
        publisher,
        isbn,
        desc
      })
      SlackBotEvent.notifyWishBookEnrolled(book)
        .catch(error => {
          logger.info(`[SlackBotEvent.notifyNewWishBook] : ${error}`)
        })
      res.send({
        message: `${book.title} 등록 성공`
      })
    } catch(error) {
      logger.error(`[WishBookController.js] : ${error}`)
      res.status(400).send({
        error: error
      })
    }
  },

  async removeList(req, res) {
    console.log(req.body)
    try {
      const { id } = req.body
      await WishBook.destroy({
        where: { id },
        force: true
      })
      res.send({
        message: `정상적으로 삭제되었습니다.`
      })
    } catch (error) {
      logger.error(`[WishBookController.js] : ${error}`)
      res.status(400).send({
        error: error
      })
    }
  }
}