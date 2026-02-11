const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give pasword as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://first_user:${password}@cluster0.0wjx05m.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url,{ family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)
// const note = new Note({
//     content: 'HTML is easy',
//     important: true
// })

// note.save().then(result => {
//     console.log('note saved!');
//     mongoose.connection.close();
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})