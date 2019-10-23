const express = require('express')
const router = express.Router()

const AuthorizationChecker = require('../controllers/AuthorizationChecker')
const RentController = require('../controllers/RentController')

// 전체 목록
router.post('/list',
  AuthorizationChecker.manageAuth,
  RentController.allUserRentStatus
)

// 특정 유저 목록
router.post('/user',
  AuthorizationChecker.userAuth,
  RentController.userRentStatus
)

router.post('/rent',
  AuthorizationChecker.userAuth,
  RentController.rentBook
)

router.post('/return',
  AuthorizationChecker.userAuth,
  RentController.returnBook
)

module.exports = router