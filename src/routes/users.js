const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersController')

router.post('/all',
  UsersController.all
)

router.post('/update',
  UsersController.update
)

module.exports = router