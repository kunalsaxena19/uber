const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');

// Load .env variables
dotenv.config();

// Debug line to make sure .env is loading
console.log('MONGO_URI from env:', process.env.MONGO_URI);

const app = express();

// Connect to MongoDB
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

app.get('/', (req, res) => {
    res.send("Bismillah Hir Rahman nir Raheem!");
});

// ✅ Prefix all routes with /api
app.use('/api/users', userRoutes);
app.use('/api/captains', captainRoutes);
app.use('/api/maps', mapsRoutes);
app.use('/api/rides', rideRoutes);

// Export app (for server.js to run)
module.exports = app;
