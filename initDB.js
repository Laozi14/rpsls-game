import { query } from './database.js';

const initializeSchema = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        wins INTEGER DEFAULT 0,
        losses INTEGER DEFAULT 0,
        ties INTEGER DEFAULT 0
      );
    `);
    console.log('Database schema initialized successfully.');
  } catch (error) {
    console.error('Error initializing schema:', error.message);
  }
};

initializeSchema();
