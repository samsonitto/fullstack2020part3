const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} 

const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@fullstack2020-mlhva.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook');
        
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const person = new Person({
        name: newName,
        number: newNumber,
        date: new Date()
      })

    person.save().then(response => {
        console.log('contact saved!')
        mongoose.connection.close()
      })
    
} else {
    console.log('Either password or password, name and number');
}


    












