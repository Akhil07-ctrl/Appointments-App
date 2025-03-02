import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    showStarred: false,
  }

  isActive = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(appointment =>
        appointment.id === id
          ? {...appointment, isFavorite: !appointment.isFavorite}
          : appointment,
      ),
    }))
  }

  titleChange = event => {
    this.setState({title: event.target.value})
  }

  dateChange = event => {
    this.setState({date: event.target.value})
  }

  filterStarred = () => {
    this.setState(prevState => ({showStarred: !prevState.showStarred}))
  }

  handleSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state
    const selectedDate = new Date(date)
    const today = new Date()

    if (title.trim() === '' || date === '') {
      alert('Please fill in both title and date fields')
      return
    }

    if (selectedDate < today) {
      alert('Please select a future date')
      return
    }

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {appointmentsList, title, date, showStarred} = this.state
    const filteredAppointments = showStarred
      ? appointmentsList.filter(appointment => appointment.isFavorite)
      : appointmentsList

    return (
      <div className="app-container">
        <div className="appointments-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="form-image-container">
            <form className="form" onSubmit={this.handleSubmit}>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input"
                placeholder="Title"
                value={title}
                onChange={this.titleChange}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="input"
                value={date}
                onChange={this.dateChange}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr className="separator" />
          <div className="header-with-filter">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${showStarred ? 'active' : ''}`}
              onClick={this.filterStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointments.length === 0 ? (
              <p className="no-appointments">No Appointments Found</p>
            ) : (
              filteredAppointments.map(each => (
                <AppointmentItem
                  key={each.id}
                  appointment={each}
                  isActive={this.isActive}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
