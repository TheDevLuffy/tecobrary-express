const express = require('express')
const router = express.Router()
const LibraryBookController = require('../controllers/LibraryBookController')
const NaverAPIController = require('../controllers/NaverAPIController')

router.post('/search',
  NaverAPIController.bookSearch
)

router.get('/total',
  LibraryBookController.total
)

router.post('/index',
  LibraryBookController.index
)

router.post('/register',
  LibraryBookController.bookRegister
)

module.exports = router
