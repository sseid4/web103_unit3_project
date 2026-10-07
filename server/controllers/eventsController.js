import {pool} from '../config/database.js'

export const getAllEvents = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM events ORDER BY date ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('Error ferching events:', error)
        res.status(500).json({error: 'Failed to fetch events' })
    }
}

export const getEventById = async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query(
            'SELECT * FROM events WHERE id = $1',
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error('Error fetching event by id:', error)
        res.status(500).json({ error: 'Failed to fetch event' })
    }
}
