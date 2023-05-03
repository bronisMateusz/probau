const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

// Serve the backend API
const api = require('./backend/app');

// Serve the frontend app
const app = express();
app.use(
  '/',
  serveStatic(path.join(__dirname, 'frontend'), { index: 'index.html' })
);
app.use(api);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
