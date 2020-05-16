const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const url = process.env.MONGODB_URI

console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connecting to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message);
    })

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true, minlength: 10 },
    date: { type: Date, required: true }
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

contactSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', contactSchema)