import { useState, useEffect } from 'react'
import Cards from './Cards'

function App() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const getlocalStorage = () => {
    return JSON.parse(localStorage.getItem('list')) || []
  }
  let [activity, SetActivity] = useState('')
  let [iteams, setIteams] = useState(getlocalStorage())

  const addActivity = () => {
    if (activity === '') return ''
    let date = new Date()
    let month = monthNames[date.getMonth()]
    date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    date = +date.toString().slice(8, 10)
    setIteams([
      ...iteams,
      {
        totalDay: date,
        monthName: month,
        id: iteams.length,
        taskCompleted: [],
        taskname: activity,
      },
    ])
    SetActivity('')
  }
  useEffect(() => {
    console.log('hello')
    localStorage.setItem('list', JSON.stringify(iteams))
  }, [iteams, activity])
  ///
  let handleTask = (updateElm) => {
    let updatedta = iteams.map((e) => {
      if (updateElm.id === e.id && e.taskCompleted.includes(updateElm.elm)) {
        return {
          ...e,
          taskCompleted: e.taskCompleted.filter((elm) => elm !== updateElm.elm),
        }
      } else if (updateElm.id === e.id) {
        return { ...e, taskCompleted: [...e.taskCompleted, updateElm.elm] }
      } else {
        return e
      }
    })
    setIteams(updatedta)
  }
  //delete
  let handleDelete = (taskId) => {
    let updatedta = iteams.filter((e) => e.id !== taskId)
    setIteams(updatedta)
  }

  return (
    <main className="container">
      <section className="inputForm">
        <h1>Monthly Activity Tracker!</h1>
        <form>
          <input
            value={activity}
            onChange={(e) => SetActivity(e.target.value)}
            type="text"
            placeholder="e.g coding"
          />
          <button onClick={addActivity}>Add Activity</button>
        </form>
      </section>
      <section className="cards-list">
        {iteams.map((elm) => (
          <Cards
            handleDelete={handleDelete}
            handleTask={handleTask}
            key={elm.id}
            {...elm}
          />
        ))}
      </section>
    </main>
  )
}

export default App
