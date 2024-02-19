const redis = require("redis");

const client = redis.createClient();

client.on("error", function (err) {
	console.log("Error " + err);
});

async function main() {
	if (client.connect()) {
		console.log("successfully");
	} else {
		console.log("error");
	}

	await client.publish("channel", "Hello!");

	client.quit();
}

main();
