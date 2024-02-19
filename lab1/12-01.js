const redis = require("redis");
let client = redis.createClient();

client.on("error", function (err) {
	console.log("Error " + err);
});

client.connect().then(async () => {
	console.log("Connected");
	client.quit().then(() => {
		console.log("Disconnected");
	});
});
