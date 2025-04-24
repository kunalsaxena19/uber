// Load core modules
const http = require('http');

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Import Express app and Socket setup
const app = require('./app');
const { initializeSocket } = require('./socket');

// Get port from .env or default to 3000
const PORT = process.env.PORT || 3000;

// Create HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.io on the server
initializeSocket(server);

// Start listening on the specified port
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
