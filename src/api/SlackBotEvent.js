const Api = require('./Api')

const notifyNewWishBook = (bookInfo) => {
  Api.base().post('registered', bookInfo)
}

const notifyWishBookEnrolled = (bookInfo) => {
  Api.base().post('enrolled', bookInfo)
}

module.exports = {
  notifyNewWishBook,
  notifyWishBookEnrolled
}