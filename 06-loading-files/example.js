import fs from "fs/promises";

async function readFileAndWriteToFile() {
	try {
		// Read the content of the input file
		const data = await fs.readFile("input.txt", "utf8");
		console.log("File content:", data);

		// Write the content to the output file
		await fs.writeFile("output.txt", data);
		console.log("Content written to output.txt");
	} catch (err) {
		console.error("Error:", err);
	}
}

readFileAndWriteToFile();

// Execute the script by running:
// $ node fileOperations.js
