const express = require('express')
const app = express()

const persons =  [
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Samson Azizyan",
      number: "0405755084",
      id: 5
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})