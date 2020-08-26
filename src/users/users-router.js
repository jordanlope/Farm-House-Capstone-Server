const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const { xss } = require('xss')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password = '', user_name = '', full_name = '', email = '', description = '' } = req.body

    for (const field of ['full_name', 'user_name', 'password', 'email', 'description'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    ).then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

        const checkPassword = UsersService.validatePassword(password)
        if(checkPassword)
          return res.status(401).json({ error: 'Password invalid' })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,
              password: hashedPassword,
              full_name,
              email,
              description
            }
            console.log('Hashed', hashedPassword)
            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            ).then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
  })

module.exports = usersRouter