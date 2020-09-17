import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Final = ({country}) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)
                console.log(response.data)
            })
    }, [country])
    if (weather) {
        return(
            <>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h2>languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={country.flag} height="200" alt={`flag from ${country.name}`}></img>
                <h2>{`Weather in ${country.capital}`}</h2>
                <div><b>temperature:</b> {weather.current.temperature} Celsius</div>
                <img src={weather.current.weather_icons[0]}></img>
                <div><b>wind:</b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
            </>
        )
    }
    return(
        <>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} height="200" alt={`flag from ${country.name}`}></img>
            <h2>{`Weather in ${country.capital} loading...`}</h2>
        </>
    )
}

export default Final