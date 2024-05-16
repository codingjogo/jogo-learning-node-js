import http from 'http';
// open a PORT for server
const PORT = process.env.PORT;

// creates a server
const server = http.createServer((req,res) => {
    // res.write('Hello World WRITE');
    // res.setHeader('Content-Type', 'text/html');
    // res.statusCode = 404;

    // this shows the path of the url like:
    // "/", "/about", "/profile"....
    console.log(req.url)
    // this shows /GET, /POST, /SET ...
    console.log(req.method)

    // instead separating, do this:
    res.writeHead(404, {'Content-Type': 'text/html'})

    res.end(JSON.stringify({ message: 'ERROR MESSAGE GOES HERE'}));
})

// listen to server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})