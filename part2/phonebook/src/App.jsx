import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(all => {
        setPersons(all)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newPhone
    }

    const found = persons.find((person) => person.name === newName)
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        personService.update(found.id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
          })
      }
      setNewName('')
      setNewPhone('')
      return false
    }

    personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhone('')
      })
  }

  const deletePerson = (person) => {
    console.log('delete Peron ', person.id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id)
        .then(returnedPerson => {
            setPersons(persons.filter(p => p.id !== returnedPerson.id))
        })
    }
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
      
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App
