const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const Person = require('./models/person')


const app = express();
app.use(express.json());
app.use(express.static('dist'));



morgan.token('body', (request) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get("/api/persons", (request, response, next) => {
    Person.find({}).then(result => {
        response.json(result);
    })
    .catch(error => next(error))
});

app.get("/info", (request, response, next) => {
    Person.find({}).then(result => {
        const time = new Date();
        const num = result.length;
        response.send(`<div><p>Phonebook has info for ${num} people</p><p>${time}</p></div>`);
    })
    .catch(error => next(error))
   
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(result => {
        response.json(result);
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end();
    })
    .catch(error => next(error))
    
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    
    if (!(body.name && body.number)) {
        return response.status(400).json({error: "content missing"})
    }

    // const check = persons.filter(person => person.name.toLowerCase() === body.name.toLowerCase());

    // if (check.length > 0) {
    //     return response.status(400).json({error: "name must be unique"});
    // }
    const person = new Person({
        name : body.name,
        number: body.number,
    })
    person.save().then(result => {
        response.json(person)
    })    
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next)=> {
    const {name, number} = request.body;
    Person.findById(request.params.id).then(note => {
        note.name = name;
        note.number = number;

        note.save().then(updatedNote => response.json(updatedNote))
        .catch(error => next(error))

    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(404).send({error: "misformated id"})
    }

    next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});