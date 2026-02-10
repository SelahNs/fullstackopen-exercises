const express = require("express");
require('dotenv').config()

const Note = require("./models/note.js")
const app = express();


app.use(express.json());
app.use(express.static('dist'));

app.get('/', (request, reponse) => {
    reponse.send('<h1>Hello World</h1>');
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id).then(result => {
  response.status(204).end();
  })
  .catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malfomatted id'})
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({error : "content missing"});
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(result => {
    response.json(result)
  })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`The server started on the port ${PORT}.`);
});
