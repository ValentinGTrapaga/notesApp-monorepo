const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/user')
const Note = require('../models/note')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
    date: 1
  })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const user = await User.findById(id).populate('notes', {
    content: 1,
    important: 1,
    date: 1
  })
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.post('/resetAllUsers', async (request, response) => {
  await User.deleteMany({})
  await Note.deleteMany({})

  response.status(204).end()
})

module.exports = usersRouter
