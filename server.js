const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the backend API
// ...

// Catch-all route to serve the frontend app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5173; // Use the PORT environment variable if it exists, or default to 5173
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
