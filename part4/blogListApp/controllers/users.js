const User = require('../models/users')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) =>{
  const {username, name, password} = request.body
  
  if (password.length < 3) {
    return response.status(400).json({error: "invalid password"})
  }

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  await user.save()
  response.status(201).json(user)
})

userRouter.get('/', async (request, response) => {
  const values = await User.find({}).populate('blogs')
  response.json(values)
})

module.exports = userRouter