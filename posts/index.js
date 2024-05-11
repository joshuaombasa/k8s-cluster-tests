const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const { default: axios } = require('axios')

const posts = {}

const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', (request, response) => {
  response.send(posts)
})

app.post('/posts', async (request, response) => {
  const { post } = request.body
  console.log(post)
  const id = randomBytes(4).toString('hex')

  posts[id] = { id, post }
  
  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: { id, post }
    })
  } catch (error) {
    
  }

  response.send({})

})

app.post('/events', (request,response) => {
  const event = request.body

  console.log(event)

  response.send({})
})

app.listen(4000, () => {
  console.log('Server running on port 4000')
})