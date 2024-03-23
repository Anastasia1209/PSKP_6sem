const redis = require("redis");
const client = redis.createClient();

client.connect();

client.on("error", function (err) {
	console.log("Error " + err);
});

client.on("connect", async () => {
	console.log("Connected");
	await client.set("key", 0);

	////
	console.log("incr");
	console.time();
	for (let i = 0; i < 10000; i++) {
		await client.incr("key");
	}
	console.timeEnd();

	////
	console.log("decr");
	console.time();
	for (let i = 0; i < 10000; i++) {
		await client.decr("key");
	}
	console.timeEnd();

	client.quit();
});
