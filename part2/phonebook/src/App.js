import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Services from './services/backend'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [message, setMessage] = useState(null)
  const [messageState, setMessageState] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteButton = (person) => {
    if (window.confirm(`Really delete ${person.name} from the phone book?`)) {
      Services
      .destroy(person.id)
      .then(() => {
          Services
          .getAll()
          .then(response => {
              setPersons(response)
          })
          setMessage(`Deleted ${person.name}`)
          setMessageState('s')
          setTimeout(() => {
            setMessage(null)
            setMessageState(null)
          }, 3000)
      })
      .catch(error => {
        Services
          .getAll()
          .then(response => {
          setPersons(response)
        })
        setMessage(`Information of ${person.name} has already been removed from server`)
        setMessageState('e')
        setTimeout(() => {
          setMessage(null)
          setMessageState(null)
        }, 3000)
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    if (!newName) {
      setMessage(`Please specify a name.`)
      setMessageState('e')
      setTimeout(() => {
        setMessage(null)
        setMessageState(null)
      },3000)
      return
    }
    if (!newNumber) {
      setMessage(`Please specify a number.`)
      setMessageState('e')
      setTimeout(() => {
        setMessage(null)
        setMessageState(null)
      },3000)
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (!persons.filter(person => person.name === newName).length) {
      Services
      .create(nameObject)
      .then(response => {
        Services
        .getAll()
        .then(response => {
          setPersons(response)
        })
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${nameObject.name}`)
        setMessageState('s')
        setTimeout(() => {
          setMessage(null)
          setMessageState(null)
        }, 3000)
      }
      )
      .catch(error => {
        setMessage(error.response.data.error)
        setMessageState('e')
        setTimeout(() => {
          setMessage(null)
          setMessageState(null)
        }, 3000)
      })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        Services
        .update(persons.find(person => person.name === newName).id,nameObject)
        .then(response => {
          Services
          .getAll()
          .then(response => {
            setPersons(response)
            setNewName('')
            setNewNumber('')
            setMessage(`Altered number from ${nameObject.name}`)
            setMessageState('s')
            setTimeout(() => {
              setMessage(null)
              setMessageState(null)
            }, 3000)
          })
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setMessageState('e')
          setTimeout(() => {
          setMessage(null)
          setMessageState(null)
          }, 3000)
        })
      }
    }
    
  }

  useEffect(() => {
  Services
  .getAll()
  .then(savedPersons => setPersons(savedPersons))
  }, [])
  return (
    <div>
      <Notification message={message} state={messageState}/>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDeleteButton={handleDeleteButton}/>
    </div>
  )
}

export default App