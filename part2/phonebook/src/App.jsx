import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      phone: newPhone
    }

    const found = persons.find((person) => person.name === newName)
    if (found) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhone('')
      return false
    }

    setPersons(persons.concat(personObj))
    setNewName('')
    setNewPhone('')
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = (search.length > 0)
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()) )
    : persons

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>
      <PersonForm newName={newName} newPhone={newPhone} handlePersonChange={handlePersonChange} handlePhoneChange={handlePhoneChange} addPerson={addPerson} />

      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow} />
      
    </div>
  )
}

export default App
