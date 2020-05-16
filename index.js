require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
// eslint-disable-next-line import/newline-after-import
const cors = require('cors')
const app = express()
const Person = require('./modules/person')

// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status - :response-time ms :body'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res, next) => {
  Person
    .find({})
    .then((persons) => {
      res
        .json(persons.map((person) => person.toJSON()))
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res, next) => {
  let qty = 0
  let content = ''
  const time = new Date()

  Person
    .find({})
    .then((persons) => {
      qty = persons.length
      content = `<p>Phonebook has info for ${qty} people</p>
                  <p>${time}</p>`
      res.send(content)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.send('There is no such person')
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))

  res.status(204).end()
})

// eslint-disable-next-line consistent-return
app.post('/api/persons', (req, res, next) => {
  const { body } = req

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Name or number missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  })

  person
    .save()
    .then((savedPerson) => {
      res
        .json(savedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  // eslint-disable-next-line no-else-return
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
