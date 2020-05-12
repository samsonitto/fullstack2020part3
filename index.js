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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})