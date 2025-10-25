import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = (good - bad) / (good + bad + neutral) || 0;
  const percentage = good / (good + bad + neutral) * 100 || 0;

  function handleClick(type) {
    if (type === "good") {
      setGood(good + 1);
    } else if (type === "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  }

  return (
    <main>
      <section>
        <h2>
          give feedback
        </h2>
        <Button name="good" handleClick={() => handleClick("good")} />
        <Button name="neutral" handleClick={() => handleClick("neutral")} />
        <Button name="bad" handleClick={() => handleClick("bad")} />
      </section>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        average={average}
        percentage={percentage}
      />


    </main>
  )
}

function Statistics({ good, neutral, bad, average, percentage }) {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <p>no feedback provided</p>
    )
  }
  return (
    <section>
      <h2>
        statitics
      </h2>
      <table>
        <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="percentage" value={percentage + "%"} />
        </tbody >
      </table>
    </section>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>  
    </tr>
  )
}

function Button({ name, handleClick }) {
  return (
    <button onClick={handleClick}>
      {name}
    </button>
  )
}

export default App