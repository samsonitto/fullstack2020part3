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

let persons =  []

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  //res.json(persons)
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/info', (req, res) => {
    const qty = persons.length
    const time = new Date()

    const content = `<p>Phonebook has info for ${qty} people</p>
                    <p>${time}</p>`

  res.send(content)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if(person) {
        res.json(person)
    } else {
        res.send(`There is no such person`)
        res.status(404).end()     
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id === id)

    res.status(204).end()
})

const generatedId = () => {
    return Math.floor(Math.random() * Math.floor(999999))
}

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

    //persons = persons.concat(person)

    person.save().then(savedPerson => {
      res.json(savedPerson.toJSON())
      persons = persons.concat(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})