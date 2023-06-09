const mongoose = require('mongoose');

const MONGO_URI = '';
const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
}

module.exports = connectDB;
