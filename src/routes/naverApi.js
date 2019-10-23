const express = require('express')
const router = express.Router()
const NaverAPIController = require('../controllers/NaverAPIController')

router.post('/search',
  NaverAPIController.bookSearch
)

module.exports = router
