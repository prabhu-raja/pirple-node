/**
 * Primary File for the API
 */

// Dependencies
const http = require('http');
const url = require('url');


// The server should respond  to all requests with a string
const server = http.createServer((req, res) => {

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);
    console.log(`Parsed Url - ${JSON.stringify(parsedUrl)}`);


    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Send the response
    res.end(`Hello World from server`);


    // Log the request path
    console.log(`Req received on path🐛 - ${trimmedPath}`);
});

// Start a server, and have it listen on port 3000
server.listen(3000, () => console.log('The Server is listening on Port 3000🎧'));
