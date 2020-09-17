import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({eventHandler,text}) => {
  return(
    <>
      <button onClick={eventHandler}>{text}</button>
    </>
  )
}

const Statistic = ({value,text}) => {
  return(
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Test = ({value,text}) => {
  return(
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({good,neutral,bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return(
      <>
      <h1>statistics</h1>
      <div>No feedback given</div>
      </>
    )
  }
  return(
    <>
    <h1>statistics</h1>
    <table>
    <tbody>
    <Statistic text="good" value={good}/>
    <Statistic text="neutral" value={neutral}/>
    <Statistic text="bad" value={bad}/>
    <Statistic text="all" value={good+neutral+bad}/>
    <Statistic text="average" value={(good-bad)/(good+neutral+bad)}/>
    <Statistic text="positive" value={good/(good+neutral+bad)*100}/>
    </tbody>
    </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <div>
      <h1>give feedback</h1>
      <Button text="good" eventHandler={() => setGood(good + 1)}/>
      <Button text="neutral" eventHandler={() => setNeutral(neutral + 1)}/>
      <Button text="bad" eventHandler={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)