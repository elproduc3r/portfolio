const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://jacksonjermaine2023:s3cr3tzzz@cluster0.muczdyy.mongodb.net/mgmt_db';
const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
}

module.exports = connectDB;
