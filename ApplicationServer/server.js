const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');

fs.writeFile(path.join(__dirname, 'dist/assets/config.json'), '{ "restServerUrl": "http://' + (process.env.REST_URL || 'localhost') + ':3000/" }', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('Saved url "http://' + (process.env.REST_URL || 'localhost') + ':3000/" as restServerUrl in assets/config.json');
}); 

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`App running on localhost:${port}`));