const mongoose = require('mongoose');

require('dotenv').config()
const DB_URL = process.env.DB_URL

async function connectToMongoDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log('Connected to MongoDB using Mongoose');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

module.exports = connectToMongoDB;

