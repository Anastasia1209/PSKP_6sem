const http = require("http");
const {models,connection} = require("./utils/Db");
const handleGetRequest = require("./handlers/handleGetRequest");
const handlePostRequest = require("./handlers/handlePostRequest");
const handlePutRequest = require("./handlers/handlePutRequest");
const handleDeleteRequest = require("./handlers/handleDeleteRequest");


const startApp = async () => {
    try {
        http.createServer(async (req, res) => {
            switch (req.method) {
                case "GET":
                    console.log("GET");
                    await handleGetRequest(req, res, models);
                    break;
                case "POST":
                    console.log("POST");
                    await handlePostRequest(req, res, models);
                    break;
                case "PUT":
                    console.log("PUT");
                    await handlePutRequest(req, res, models,connection);
                    break;
                case "DELETE":
                    console.log("DELETE");
                    await handleDeleteRequest(req, res, models);
                    break;
            }
        }).listen(3000, () => {
            console.log("Server started on http://localhost:3000/");
        });


    } catch (e) {
        console.error(e);
    }
};

startApp();
