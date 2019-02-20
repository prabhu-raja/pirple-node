/**
 * Primary File for the API
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond  to all requests with a string
const server = http.createServer((req, res) => {

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);
    console.log(`Parsed Url - ${JSON.stringify(parsedUrl)}`);

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;



    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

   
    // Get the Http Method
    const method = req.method;

    console.log('Method: ' + method);


    // Get Headers
    const headers = req.headers;
    console.log(`Req received by 😀 ${JSON.stringify(headers)}`);

    // Get the payload if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', data => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        // Choose the handler this request should go to. 
        const chosenHandler = router[trimmedPath] !== undefined ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to the handler
        const objData = {
            trimmedPath: trimmedPath,
            queryStringObject: queryStringObject,
            method: method,
            headers: headers,
            payload: buffer
        }

        chosenHandler(objData, (statusCode, payload) => {
            // Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode == 'number') ? statusCode : 200;

            // Use the payload called back by the handler, or default to an empty object
            payload = typeof(payload == 'object') ? payload : {};

            const payloadString = JSON.stringify(payload);

            // Return the response
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the Request
            console.log('Returning this response 🎁 ->', statusCode, payloadString);
        });


    });
});

// Start a server, and have it listen on port 3000
server.listen(3000, () => console.log('The Server is listening on Port 3000🎧'));


// Define the handlers
const handlers = {};

// Sample Handler
handlers.sample = (data, callback) => {
    // callback a http status code and a payload object
    callback(406, {'name': 'i am a sample handler'})
}

// Not Found Handler
handlers.notFound = (data, callback) => {
    callback(404);
}

// Define a request router
const router = {
    'sample': handlers.sample
}