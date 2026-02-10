const mongoose = require('mongoose');
// if (process.argv.length < 3) {
//     console.log('Give pasword as an argument');
//     process.exit(1);
// }

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false);

mongoose.connect(url,{family: 4}).then(result => {
    console.log('connect to MongoDB')
}).catch(error=> {
    console.group('error connecting to MongoDB:', error.message)
})

const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minLength: 5,
      required: true
    },
    important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, retrunedObject) => {
    retrunedObject.id = retrunedObject._id.toString()
    delete retrunedObject._id
    delete retrunedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema);