import React, {useState, useEffect} from 'react'
import Final from './Final'

const Results = ({filter, countries}) => {
    const [show, setShow] = useState(null)
    useEffect(() => {
        setShow(null)
    }, [filter])
    if(countries.length === 0) {
        return(<div>loading countries from server...</div>)
    }
    const filtered = countries.filter(country => country.name.toLowerCase().search(filter.toLowerCase()) !== -1)
    if (filtered.length === 1 && show !== filtered[0]) {
        setShow(filtered[0])
    }
    else if(filtered.length > 1 && filtered.length < 11 && !show) {
        return(<div>{filtered.map(country => <div key={country.name}>{country.name} <button onClick={() => setShow(country)}>show</button></div>)}</div>)
    } else if (!show){
        return(<div>{(filtered.length === 0 ? 'NO RESULTS' : 'TOO MANY RESULTS')}</div>)
    }
    return(<Final country={show}/>)
}

export default Results