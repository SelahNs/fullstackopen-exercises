import { useEffect, useState } from 'react'
import Form from './components/Form';
import Persons from './components/Persons';
import Filter from './components/Filter';
import axios from 'axios';
import phoneService from './services/phonebooks';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState(null);

  useEffect(() => {
    phoneService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const toShow = persons && (searchTerm !== "" ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())) : persons);

  const handleSumbit = (e) => {
    e.preventDefault();
    const isAvailable = persons.some(person => person.name === newName);
    if (isAvailable) {
      const confirm = window.confirm(`${newName} is already added to the phonebook`);
      if (confirm) {
        const newObject = { name: newName, number: newNumber };
        phoneService.update(persons.find(person => person.name == newName).id, newObject).then(response => setPersons(persons.map(person => {
          if (person.name === response.name) {
            return response

          }
          return person
        })));
        setMessage(`Added ${newObject.name}`);
        setTimeout(() => {
          setMessage(null)
        }, 1500)

      }
    }
    else {
      const newObject = { name: newName, number: newNumber }
      phoneService
        .create(newObject)
        .then(response => {
          setPersons(persons.concat(response))
          setMessage(`Added ${newObject.name}`);
          setTimeout(() => {
            setMessage(null)
          }, 1500)

        })


    }
    setNewName("");
    setNewNumber("");
  }

  const handleDelete = (id) => {
    const personToDelte = persons.find(p => p.id === id)
    const confirm = window.confirm(`Are you sure you want to delete ${personToDelte.name}?`)

    if (confirm) {
      phoneService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`Deleted ${persons.find(person => person.id === id).name}`);

        setTimeout(() => {
          setMessage(null)
        }, 1500)
          
      }).catch(error => {
            if (error.response && error.response.status === 404) {
              setMessage(`Information of ${personToDelte.name} was already removed from server`);
            }
            else {
              setMessage(`Error: Something went wronge delteing ${personToDelte.name}`)
            }
            setColor('red')
            setTimeout(() => {
              setMessage(null)
              setColor(null)
            }, 5000);
            setPersons(persons.filter(p => p.id !== id));
          })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color}/>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>add a new</h3>
      <Form handleSumbit={handleSumbit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons toShow={toShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
