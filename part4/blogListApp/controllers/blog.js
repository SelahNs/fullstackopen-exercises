const blogRouter = require('express').Router()
const Blog = require('../models/blog');


blogRouter.get('/', async (request, response,next) => {
  const blogs = await Blog.find({})
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
  const result = await blog.save()
  response.status(201).json(result)
})


module.exports = blogRouter;