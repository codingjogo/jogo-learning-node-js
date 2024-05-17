import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
	{ id: 1, name: "Jogo" },
	{ id: 2, name: "Jane Doe" },
	{ id: 3, name: "Mak Sheesh" },
];

// creates a server
const server = createServer((req, res) => {
	if (req.url === "/api/users" && req.method === "GET") {
		res.setHeader("Content-Type", "application/json");
		res.write(JSON.stringify(users));
		res.end();
	} else if (
		req.url.match(/\/api\/users\/([0-9]+)/) &&
		req.method === "GET"
	) {
		const urlSplit = req.url.split("/"); // input: 1 output: [ '', 'api', 'users', '1' ]
		const id = urlSplit[3]; // gets the 3rd index which is "1";
		const user = users.find((user) => user.id === parseInt(id)); // returns object that matches the ID from request URL
		res.setHeader("Content-Type", "application/json");

		// if user exist
		if (user) {
			console.log(`ID user: ${id}`);
			console.log(`User: ${user}`);
			res.write(JSON.stringify(user));
		} else {
			console.error(`User ID:${id} not found`);
			res.statusCode = 404;
			res.write(JSON.stringify({ message: "User not found" }));
		}

		res.end();
	} else {
		res.setHeader("Content-Type", "application/json");
		res.statusCode = 404;
		res.write(JSON.stringify({ message: "Route not found" }));
		res.end();
	}
});

// listen to server
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
