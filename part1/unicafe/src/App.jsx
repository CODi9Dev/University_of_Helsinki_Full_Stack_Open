import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {text == "positive" ? '%' : ''}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all == 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive} />
      </tbody>
    </table>
  )
}

function App() {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ all, setAll ] = useState(0)
  const [ average, setAverage ] = useState(0)
  const [ positive, setPositive ] = useState(0)

  const calculateAverage = (newAll, newGood, newBad) => {
    const qty = (newGood - newBad) / newAll
    setAverage(qty)
  }

  const calculatePositive = (newAll, newGood) => {
    const result = (newGood * 100) / newAll
    setPositive(result)
  }

  const handleGoodClick = () => {
    const newAll = all + 1
    const newGood = good + 1
    setGood(newGood)
    setAll(newAll)
    calculateAverage(newAll, newGood, bad)
    calculatePositive(newAll, newGood)
  }

  const handleNeutralClick = () => {
    const newAll = all + 1
    setNeutral(neutral + 1)
    setAll(newAll)
    calculateAverage(newAll, good, bad)
    calculatePositive(newAll, good)
  }

  const handleBadClick = () => {
    const newAll = all + 1
    const newBad = bad + 1
    setBad(newBad)
    setAll(newAll)
    calculateAverage(newAll, good, newBad)
    calculatePositive(newAll, good)
  }

  return (
    <>
      <h1>Give feedback</h1>
      <p>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </p>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </>
  )
}

export default App
