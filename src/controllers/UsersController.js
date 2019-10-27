const { User } = require('../models')
const logger = require('../logger')

module.exports = {
  async all (req, res) {
    try {
      const users = await User.findAll()
      const parsedUsers = []
      users.forEach(user => {
        const parsedUser = user.toJSON()
        parsedUsers.push({
          id: parsedUser.id,
          email: parsedUser.email,
          name: parsedUser.name,
          authorization: parsedUser.authorization,
          createdAt: parsedUser.createdAt
        })
      })
      res.send({
        users: parsedUsers
      })
    } catch (error) {
      logger.error(`[UsersController.js] : ${error}`)
      res.status(400).send({
        error
      })
    }
  },

  async update(req, res) {
    try {
      const { id, newAuthorization } = req.body
      const user = await User.update({
        authorization: newAuthorization
      }, {
        where: {
          id
        }
      })
      if (user[0] === 0) {
        res.status(400).send({
          error: '잘못된 요청'
        })
      }
      else if (user[0] === 1) {
        res.send({
          message: '성공'
        })
      } else {
        res.status(400).send({
          error: '원인을 찾을 수 없습니다.'
        })
      }
    } catch (error) {
      logger.error(`[UsersController.js] : ${error}`)
      res.status(400).send({
        error
      })
    }
  }
}