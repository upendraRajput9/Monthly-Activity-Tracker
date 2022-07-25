import { Component } from 'react'

export default class Cards extends Component {
  constructor(props) {
    super()
  }

  render() {
    let { monthName, totalDay, taskCompleted, taskname, id } = this.props
    let days = []
    for (let i = 0; i < totalDay; i++) {
      days.push(i)
    }
    return (
      <article>
        <div className="cross" onClick={() => this.props.handleDelete(id)}>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div className="task">
          <h2>{taskname}</h2>
          <h3>{monthName}</h3>
        </div>
        <ul>
          {days.map((day) => (
            <li
              className={taskCompleted.includes(day) ? 'active' : ''}
              onClick={() =>
                this.props.handleTask({ id: this.props.id, elm: day })
              }
              key={day}
            >
              {day + 1}
            </li>
          ))}
        </ul>
      </article>
    )
  }
}
