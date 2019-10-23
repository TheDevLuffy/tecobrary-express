const express = require('express')
const router = express.Router()
const UserBookController = require('../controllers/user/UserBookController')
const MyInfoController = require('../controllers/user/MyInfoController')

router.get('/total',
  UserBookController.total
)

router.post('/books',
  UserBookController.books
)

router.post('/search',
  UserBookController.search
)

router.post('/bookinfo',
  UserBookController.book
)

router.patch('/editname',
  MyInfoController.editName
)

module.exports = router