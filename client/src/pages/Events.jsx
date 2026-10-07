import React, { useEffect, useState } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'
import '../css/Events.css'

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, locationsData] = await Promise.all([
          EventsAPI.getAllEvents(),
          LocationsAPI.getAllLocations()
        ])
        setEvents(eventsData)
        setLocations(locationsData)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchData()
  }, [])

  const filteredEvents = selectedLocation
    ? events.filter((event) => Number(event.location_id) === Number(selectedLocation))
    : events

  return (
    <div className='location-events'>
      <div className='events-filters'>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value=''>See events at . . .</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        <button onClick={() => setSelectedLocation('')}>Show All Events</button>
      </div>

      <main>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              image={event.image}
            />
          ))
        ) : (
          <h2><i className='fa-regular fa-calendar-xmark fa-shake'></i> No events found.</h2>
        )}
      </main>
    </div>
  )
}

export default EventsPage
