import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const errorObj = {
    msg: null,
    type: null
  }
  const [customMessage, setCustomMessage] = useState(errorObj)

  useEffect(() => {
    personService
      .getAll()
      .then(all => {
        setPersons(all)
      })
  }, [])

  const hideMessage = () => {
    setTimeout(() => {
      setCustomMessage({msg: null, type: null})
    }, 5000)
  }

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
            setCustomMessage({msg: `${found.name} updated successfuly`, type: 'success'})
            hideMessage()
          })
          .catch(error => {
            const msg = error.message.includes('404') ? `${found.name} is no longer in the phonebook`: error.message.code
            setCustomMessage({msg: msg, type: 'error'})
            setPersons(persons, found.id)
            hideMessage()
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
        setCustomMessage({msg: `Added ${newName}`, type: 'success'})
        hideMessage()
      })
  }

  const deletePerson = (person) => {
    console.log('delete Peron ', person.id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id)
        .then(returnedPerson => {
            setPersons(persons.filter(p => p.id !== returnedPerson.id))
            setCustomMessage({msg: `Deleted ${person.name}`, type: 'success'})
            hideMessage()
        })
        .catch(error => {
          const msg = error.message.includes('404') ? `${person.name} is no longer in the phonebook`: error.message.code
          setCustomMessage({msg: msg, type: 'error'})
          hideMessage()
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

      <Notification message={customMessage.msg} type={customMessage.type} />

      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>
      <PersonForm newName={newName} newPhone={newPhone} handlePersonChange={handlePersonChange} handlePhoneChange={handlePhoneChange} addPerson={addPerson} />

      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App
