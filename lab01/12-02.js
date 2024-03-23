const redis = require("redis");
const client = redis.createClient();

client.connect();

client.on("error", function (err) {
	console.log("Error " + err);
});

client.on("connect", async () => {
	console.log("Connected");

	console.log("set");
	console.time();
	for (let i = 0; i < 10000; i++) {
		await client.set(`${i}`, `set${i}`);
	}
	console.timeEnd();

	////
	console.log("get");
	console.time();
	for (let i = 0; i < 10000; i++) {
		await client.get(`${i}`);
	}
	console.timeEnd();
	////
	console.log("del");
	console.time();
	for (let i = 0; i < 10000; i++) {
		await client.del(`${i}`);
	}
	console.timeEnd();

	client.quit();
});
