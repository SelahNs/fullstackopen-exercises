const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('Give the password')
//     process.exit(1);
// }

const uri = process.env.PHONEBOOK_URI

mongoose.set('strictQuery', false);

mongoose.connect(uri, {family: 4}).then(result => {
    console.log('connected to monogodb')
})
.catch(error => {
    console.group('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
        validator: function (v) {
            return /^\d{2,3}-\d+$/.test(v)
        } ,
        message: props => `${props.value} is not a valid phone number! format: 09-123 or 040-123`
    }
}
}) 

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Person', personSchema)






// if(process.argv.length === 3) {
//     Person.find({}).then(result => {
//         console.log("phonebook:");
//         result.forEach(person => console.log(person.name+ " " + person.number));
//         mongoose.connection.close();
//     })
    
// } else if (process.argv.length === 5) {

//     Person.find({name :process.argv[3]}).then(result => {
//         if (result.length !== 0) {
//             console.log('This name is already in the phonebook');
//             mongoose.connection.close();
//             return
//         } else {
//             let person = new Person({
//                 name: process.argv[3],
//                 number: process.argv[4]
//             })
//             person.save().then(result => {
//                 console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
//                 mongoose.connection.close();
//             })
//         } 
//     })
// } else {
//     console.log("Please provide: password (to list) or password name number (to add)");
//     mongoose.connection.close();
// }


// const person = new Person ({
//     name:"alan ture",
//     number: "23-23289342"
// })

// person.save().then(result => {
//     console.log('phone number saved!');
//     mongoose.connection.close()
// })