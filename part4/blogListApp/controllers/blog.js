const blogRouter = require('express').Router()
const Blog = require('../models/blog');
const User = require('../models/users')


blogRouter.get('/', async (request, response,next) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!(blog.url && blog.title)) {
    return response.status(400).send({error: 'missing properies'})
  }
  if (!blog.likes) {
    blog.likes = 0
  }
  const user = await User.find({})
  blog.user = user[0]._id
  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    blog, 
    { new: true, runValidators: true, context: 'query' }
  )

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogRouter;