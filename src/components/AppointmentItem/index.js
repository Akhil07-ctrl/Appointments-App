import {format} from 'date-fns'
import './index.css'

const AppointmentItem = ({appointment, isActive}) => {
  const {id, title, date, isFavorite} = appointment

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          onClick={() => isActive(id)}
          className="star-button"
          aria-label={isFavorite ? 'Mark as not favorite' : 'Mark as favorite'}
        >
          <img
            src={
              isFavorite
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt={isFavorite ? 'filled star' : 'star'}
            className="star"
          />
        </button>
      </div>
      <p className="date-text">
        Date: {format(new Date(date), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}

export default AppointmentItem
