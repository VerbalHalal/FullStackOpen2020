import React from 'react'
import DeleteButton from './DeleteButton'

const Persons = ({filter,persons,handleDeleteButton}) => {
    return(
      <>
      <ul>
        {persons.filter(person => person.name.slice(0,filter.length).toLowerCase() === filter.toLowerCase()).map(person => <li key={person.name}>{person.name} {person.number} <DeleteButton person={person} handleDeleteButton={handleDeleteButton}/></li>)}
      </ul>
      </>
    )
  }

export default Persons