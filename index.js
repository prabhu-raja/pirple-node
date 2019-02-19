/**
 * Primary File for the API
 */

// Dependencies
const http = require('http');

// The server should respond  to all requests with a string
const server = http.createServer((req, res) => {
    res.end(`Hello World from server`);
});

// Start a server, and have it listen on port 3000
server.listen(3000, () => console.log('The Server is listening on Port 3000🎧'));
