const express = require('express')
const router = express.Router()
const WishBookController = require('../controllers/WishBookController')

router.post('/', 
  WishBookController.requestBook
)

router.post('/list',
  WishBookController.requestList
)

router.post('/register',
  WishBookController.register
)

module.exports = router