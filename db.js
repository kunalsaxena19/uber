const mongoose = require('mongoose');

const connectToDb = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI is not defined in .env file");
    process.exit(1); // Stop the server if DB URI is missing
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit process on DB connection error
  }
};

module.exports = connectToDb;
