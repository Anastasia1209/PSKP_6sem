const handleRequestBody = require("../utils/handleRequestBody");
const handleModelName = require("../utils/handleModelName");

const handlePostRequest = async (req, res, models) => {

    const ENDPOINTS = [
        '/api/faculties',
        '/api/pulpits',
        '/api/subjects',
        '/api/auditoriumstypes',
        '/api/auditoriums',
        '/api/teachers',
    ]

    const url = req.url;

    if (ENDPOINTS.includes(url)) {
        const modelName = url.split('/')[2];
        const model = handleModelName(modelName, models);

        const body = await handleRequestBody(req);
        console.log(body);

        try {
            const data = await model.create(body);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
            return;
        } catch (e) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(e));
            return;
        }
    }
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end();
    return;
};

module.exports = handlePostRequest;