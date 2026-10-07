const EventsAPI = {
  getAllEvents: async () => {
    const response = await fetch('/api/events')

    if (!response.ok) {
      throw new Error('Failed to fetch events')
    }

    return response.json()
  },

  getEventById: async (id) => {
    const response = await fetch(`/api/events/${id}`)

    if (!response.ok) {
      throw new Error('Failed to fetch event by id')
    }

    return response.json()
  }
}

export default EventsAPI
