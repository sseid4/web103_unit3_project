import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const routeMap = ['echolounge', 'houseofblues', 'pavilion', 'americanairlines']

const LocationEvents = ({ index }) => {
  const locationPath = useLocation().pathname.replace('/', '')
  const locationId = Number(index) || routeMap.indexOf(locationPath) + 1 || 1

  const [location, setLocation] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationData = await LocationsAPI.getLocationById(locationId)
        const allEvents = await EventsAPI.getAllEvents()

        setLocation(locationData)
        setEvents(allEvents.filter((event) => Number(event.location_id) === Number(locationId)))
      } catch (error) {
        console.error('Error fetching location events:', error)
        setLocation(null)
        setEvents([])
      }
    }

    fetchData()
  }, [locationId])

  if (!location) {
    return (
      <div className='location-events'>
        <main>
          <h2><i className='fa-regular fa-calendar-xmark fa-shake'></i> Loading venue information...</h2>
        </main>
      </div>
    )
  }

  return (
    <div className='location-events'>
      <header>
        <div className='location-image'>
          <img src={location.image || 'https://placehold.co/600x400?text=Venue'} alt={location.name} />
        </div>

        <div className='location-info'>
          <h2>{location.name}</h2>
          <p>
            {location.address}, {location.city}, {location.state} {location.zip}
          </p>
        </div>
      </header>

      <main>
        {events.length > 0 ? (
          events.map((event) => (
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
          <h2><i className='fa-regular fa-calendar-xmark fa-shake'></i> No events scheduled at this location yet!</h2>
        )}
      </main>
    </div>
  )
}

export default LocationEvents