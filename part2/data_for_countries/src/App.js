import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  return(
    <>
    <input value={filter} onChange={handleFilterChange}/>
    <Results filter={filter} countries={countries}/>
    </>
  )
}

export default App;
