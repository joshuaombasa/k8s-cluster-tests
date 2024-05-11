const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 4005

const events = []

const app = express()
app.use(cors())
app.use(express.json())

app.get('/events', (request, response) => {
    response.json(events)
})

app.post('/events', async (request, response) => {
    const event = request.body

    events.push(event)
    console.log(event)
    try {
        await axios.post('http://localhost:4004/events', event)
        await axios.post('http://localhost:4000/events', event)
        await axios.post('http://localhost:4001/events', event)
        await axios.post('http://localhost:4002/events', event)
    } catch (error) {

    }

    response.json({})
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})