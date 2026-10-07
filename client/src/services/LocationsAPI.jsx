const LocationsAPI = {
  getAllLocations: async () => {
    const response = await fetch('/api/locations')

    if (!response.ok) {
      throw new Error('Failed to fetch locations')
    }

    return response.json()
  },

  getLocationById: async (id) => {
    const response = await fetch(`/api/locations/${id}`)

    if (!response.ok) {
      throw new Error('Failed to fetch location by id')
    }

    return response.json()
  }
}

export default LocationsAPI
