import http from "http";
// fs module
import fs from "fs/promises"; // promise version
import url from 'url';
import path from 'path'
// open a PORT for server
const PORT = process.env.PORT;
// Get current path of filename
const __filename = url.fileURLToPath(import.meta.url);
// Get current path of directory folder of that __filename
const __dirname = path.dirname(__filename);

console.log('__filename:', __filename); // Example Output: /project/src/file1.mjs
console.log('__dirname:', __dirname);   // Example Output: /project/src

// creates a server
const server = http.createServer(async (req, res) => {
	// checks methods
	try {
		if (req.method === "GET") {
			let filePath;
			// routing
			if (req.url === "/") {
				filePath = path.join(__dirname, 'public', 'index.html');
			} else if (req.url === "/about") {
				filePath = path.join(__dirname, 'public', 'about.html');
			} else {
				throw new Error('Not found')
			}

			const data = await fs.readFile(filePath);
			res.setHeader('Content-Type', 'text/html');
			res.write(data);
			res.end();
		} else {
			throw new Error("Method not allowed");
		}
	} catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("SERVER ERROR");
    }

	// res.write('Hello World WRITE');
	// res.setHeader('Content-Type', 'text/html');
	// res.statusCode = 404;

	// this shows the path of the url like:
	// "/", "/about", "/profile"....
	// console.log(req.url)
	// this shows /GET, /POST, /SET ...
	// console.log(req.method)

	// instead separating, do this:
	// res.writeHead(404, {'Content-Type': 'text/html'})

	// res.end(JSON.stringify({ message: 'ERROR MESSAGE GOES HERE'}));
});

// listen to server
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
