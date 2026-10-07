import { pool } from '../config/database.js'

export const getAllLocations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations ORDER BY id ASC')
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching locations:', error)
    res.status(500).json({ error: 'Failed to fetch locations' })
  }
}

export const getLocationById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'SELECT * FROM locations WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location not found' })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error('Error fetching location by id:', error)
    res.status(500).json({ error: 'Failed to fetch location' })
  }
}
