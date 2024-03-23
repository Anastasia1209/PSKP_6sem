const redis = require("redis");

const client = redis.createClient();

client.on("error", function (err) {
	console.log("Error " + err);
});

const listener = (message, channel) => console.log(message, channel);

async function main() {
	if (client.connect()) {
		console.log("successfully");
	} else {
		console.log("error");
	}
	await client.subscribe("channel", listener);
}

main();
