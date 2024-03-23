const redis = require("redis");
const client = redis.createClient();

client.connect();
client.flushDb();

client.on("error", function (err) {
	console.log("Error " + err);
});

client.on("connect", async () => {
	console.log("Connect");

	console.log("hset");
	console.time();
	for (let i = 0; i < 10000; i++) {
		await client.hSet(`${i}`, "value", `val-${i}`);
	}
	console.timeEnd();

	////
	console.log("hget");
	console.time();
	for (let i = 0; i < 10000; i++) {
		await client.hGet(`${i}`, "value");
	}
	console.timeEnd();

	client.quit();
});
