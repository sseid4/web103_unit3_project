import dotenv from 'dotenv'
import { pool } from './database.js'

dotenv.config()

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      address VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(255),
      zip VARCHAR(50)
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date VARCHAR(255),
      time VARCHAR(255),
      image VARCHAR(255),
      location_id INTEGER REFERENCES locations(id),
      remaining VARCHAR(255) DEFAULT 'Upcoming'
    );
  `)

  const locationCount = await pool.query('SELECT COUNT(*) FROM locations')

  if (Number(locationCount.rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO locations (name, image, address, city, state, zip)
      VALUES
        ('Echo Lounge', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', '123 Sunset Ave', 'Austin', 'TX', '78701'),
        ('House of Blues', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a', '201 Music Row', 'Dallas', 'TX', '75201'),
        ('The Pavilion', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', '777 Lawn Way', 'Houston', 'TX', '77002'),
        ('American Airlines Center', 'https://images.unsplash.com/photo-1547347298-4074fc3086f0', '500 Arena Blvd', 'Dallas', 'TX', '75202');
    `)
  }

  const eventCount = await pool.query('SELECT COUNT(*) FROM events')

  if (Number(eventCount.rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO events (title, date, time, image, location_id, remaining)
      VALUES
        ('Sunset Jazz Nights', '2026-10-12', '7:00 PM', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81', 1, 'Upcoming'),
        ('Indie Retro Live', '2026-10-15', '8:30 PM', 'https://images.unsplash.com/photo-1501612780327-45045538702b', 2, 'Upcoming'),
        ('Outdoor Cinema', '2026-10-18', '6:45 PM', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba', 3, 'Upcoming'),
        ('Game Night Arena', '2026-10-20', '7:30 PM', 'https://images.unsplash.com/photo-1547347298-4074fc3086f0', 4, 'Upcoming'),
        ('Acoustic Sessions', '2026-10-22', '8:00 PM', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f', 1, 'Upcoming'),
        ('Summer Block Party', '2026-08-15', '5:00 PM', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 3, 'Passed');
    `)
  }

  console.log('Database tables and sample data are ready.')
  process.exit(0)
}

createTables().catch((error) => {
  console.error('Reset failed:', error)
  process.exit(1)
})
