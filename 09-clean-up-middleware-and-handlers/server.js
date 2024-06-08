import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
	{ id: 1, name: "Jogo" },
	{ id: 2, name: "Jane Doe" },
	{ id: 3, name: "Mak Sheesh" },
];

// Logger Middleware
const logger = (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
}

// JSON Middleware
const jsonMiddleware = (req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
}

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
	res.write(JSON.stringify(users));
	res.end();
}

// Route handler for GET /api/users/:id
const getUserById = (req, res) => {
	const urlSplit = req.url.split("/"); // input: 1 output: [ '', 'api', 'users', '1' ]
	const id = urlSplit[3]; // gets the 3rd index which is "1";
	const user = users.find((user) => user.id === parseInt(id)); // returns object that matches the ID from request URL

	// if user exists
	if (user) {
		console.log(`ID user: ${id}`);
		console.log(`User: ${user}`);
		res.write(JSON.stringify(user));
	  } else {
		console.error(`User ID:${id} not found`);
		res.statusCode = 404;
		res.write(JSON.stringify({ message: "User not found" }));
	  }
}

// Route handler for GET /not-found-page
const notFoundHandler = (req, res) => {
	res.statusCode = 404;
		  res.write(JSON.stringify({ message: "Route not found" }));
		  res.end();
}

// Helper function to run middleware
const runMiddleware = (req, res, middlewares, index) => {
	if (index < middlewares.length) {
		middlewares[index](req, res, () => runMiddleware(req, res, middlewares, index + 1));
	} else {
		routeHandler(req, res);
	}
};

const routeHandler = (req, res) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		getUsersHandler(req, res);
	} else if (req.url.match(/\/api\/users\/([0-9]+)/) &&
	req.method === "GET") {
		getUserById(req, res);
	} else {
		notFoundHandler(req, res);
	}
}

// creates a server
const server = createServer((req, res) => {
	const middlewares = [logger, jsonMiddleware];

	runMiddleware(req, res, middlewares, 0);
	
});

// listen to server
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
