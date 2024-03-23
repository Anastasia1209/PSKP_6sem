const handleModelName = require("../utils/handleModelName");
const handleRequestBody = require("../utils/handleRequestBody");
const handleDeleteRequest = async (req, res, models) => {

    const ENDPOINTS = [
        '/api/faculties',
        '/api/pulpits',
        '/api/subjects',
        '/api/auditoriumstypes',
        '/api/auditoriums',
        '/api/teachers',
    ];

    const url = req.url;
    const splitUrl = url.split('/');
    const endpoint = `/${splitUrl[1]}/${splitUrl[2]}`;
    const code = decodeURIComponent(url.split('/')[3]);


    if (ENDPOINTS.includes(endpoint)) {
        const modelName = endpoint.split('/')[2];
        const model = handleModelName(modelName, models);

        try {
            const record = await model.findByPk(code);
            if (record) {
                console.log(record);
                const data = await record.destroy();
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(record));
                return;
            } else {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify("Not found"));
                return;
            }

        } catch (e) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(e));
            return;
        }

    }

    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end();
};

module.exports = handleDeleteRequest;