const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const Person = require('./models/person')


const app = express();
app.use(express.json());
app.use(express.static('dist'));



morgan.token('body', (request) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get("/api/persons", (request, response) => {
    Person.find({}).then(result => {
        response.json(result);
    })
});

app.get("/info", (request, response) => {
    Person.find({}).then(result => {
        const time = new Date();
        const num = result.length;
        response.send(`<div><p>Phonebook has info for ${num} people</p><p>${time}</p></div>`);
    })
   
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(result => {
        response.json(result);
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end();
    })
    
})

app.post('/api/persons', (request, response) => {
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

})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});