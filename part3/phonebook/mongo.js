const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give the password')
    process.exit(1);
}

const password = process.argv[2];


const url = `mongodb+srv://first_user:${password}@cluster0.0wjx05m.mongodb.net/phonbookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);

mongoose.connect(url, {family: 4});

const personSchema = new mongoose.Schema({
    name: String,
    number: String
}) 

const Person = mongoose.model('Person', personSchema);


if(process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(person => console.log(person.name+ " " + person.number));
        mongoose.connection.close();
    })
    
} else if (process.argv.length === 5) {

    Person.find({name :process.argv[3]}).then(result => {
        if (result.length !== 0) {
            console.log('This name is already in the phonebook');
            mongoose.connection.close();
            return
        } else {
            let person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })
            person.save().then(result => {
                console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
                mongoose.connection.close();
            })
        } 
    })
} else {
    console.log("Please provide: password (to list) or password name number (to add)");
    mongoose.connection.close();
}


// const person = new Person ({
//     name:"alan ture",
//     number: "23-23289342"
// })

// person.save().then(result => {
//     console.log('phone number saved!');
//     mongoose.connection.close()
// })