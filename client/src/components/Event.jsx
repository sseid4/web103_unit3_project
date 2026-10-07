import React, { useEffect, useState } from 'react'
import '../css/Event.css'

// Combine the "YYYY-MM-DD" date and "h:mm AM/PM" time strings into a Date
const parseEventDateTime = (date, time) => {
  if (!date) return null

  const [year, month, day] = String(date).slice(0, 10).split('-').map(Number)
  let hours = 0
  let minutes = 0

  const match = String(time || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
  if (match) {
    hours = Number(match[1])
    minutes = Number(match[2])
    const period = match[3]?.toUpperCase()
    if (period === 'PM' && hours < 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
  }

  const result = new Date(year, month - 1, day, hours, minutes)
  return isNaN(result) ? null : result
}

const formatRemaining = (ms) => {
  const totalMinutes = Math.floor(Math.abs(ms) / 60000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  if (days > 0) return `${days}d ${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

const Event = ({ id, title, date, time, image }) => {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(timer)
  }, [])

  const eventDate = parseEventDateTime(date, time)
  const remainingMs = eventDate ? eventDate.getTime() - now : null
  const hasPassed = remainingMs !== null && remainingMs < 0

  let remainingText = 'Upcoming'
  if (remainingMs !== null) {
    remainingText = hasPassed
      ? `Event passed ${formatRemaining(remainingMs)} ago`
      : `Starts in ${formatRemaining(remainingMs)}`
  }

  return (
    <article className={`event-information${hasPassed ? ' event-passed' : ''}`}>
      <img src={image || 'https://placehold.co/600x400?text=Event'} alt={title || 'Event'} />

      {hasPassed && <span className='event-passed-badge'>Event Ended</span>}

      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{title}</h3>
          <p>
            <i className='fa-regular fa-calendar fa-bounce'></i>
            {' '}{date} <br /> {time}
          </p>
          <p
            id={`remaining-${id}`}
            className={hasPassed ? 'negative-time-remaining' : 'time-remaining'}
          >
            {remainingText}
          </p>
        </div>
      </div>
    </article>
  )
}

export default Event
