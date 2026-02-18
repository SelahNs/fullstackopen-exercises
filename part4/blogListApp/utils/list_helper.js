const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes , 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, current) => {
    return current.likes > max.likes ? current : max
  })
}

const mostBlogs = (blogs) => {
  const collection = {}
  blogs.forEach((current) => {
    const value = current.author
    if(collection[value]) {
      collection[value] += 1
    } else {
      collection[value] = 1
    }
  })
  const entries = Object.entries(collection);

  const max = entries.reduce((max, current) => {
    return current[1] > max[1] ? current : max
  })

  return {
    author: max[0],
    blogs: max[1],
  }
}

const mostLikes = (blogs) => {
  const collection = {}
  blogs.forEach((current) => {
    const value = current.author
    if(collection[value]) {
      collection[value] += current.likes
    } else {
      collection[value] = current.likes
    }
  })
  const entries = Object.entries(collection);

  const max = entries.reduce((max, current) => {
    return current[1] > max[1] ? current : max
  })

  return {
    author: max[0],
    likes: max[1],
  }
}


module.exports= {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}