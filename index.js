require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./modules/person')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(express.json())
app.use(morgan(':method :url :status - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

let persons = []

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
  .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  let qty = 0
  let content = ''
  const time = new Date()

  Person.find({}).then(persons => {
    qty = persons.length
    content = `<p>Phonebook has info for ${qty} people</p>
                  <p>${time}</p>`
    res.send(content)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
      .then(person => {
        if(person) {
          res.json(person)
      } else {
          res.send(`There is no such person`)
          res.status(404).end()     
      }
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number missing'
        })
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: `${body.name} is already in the phonebook`
        })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
      date: new Date()
    })

    person.save().then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
}) 

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})