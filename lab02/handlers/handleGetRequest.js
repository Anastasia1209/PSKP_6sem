const handleModelName = require("../utils/handleModelName");
const fs = require('fs');

const handleGetRequest = async (req, res, models) => {

    const ENDPOINTS = [
        '/api/faculties',
        '/api/pulpits',
        '/api/subjects',
        '/api/auditoriumstypes',
        '/api/auditoriums',
        '/api/teachers',
    ];

    const url = decodeURI(req.url);
    console.log(url);

    if (ENDPOINTS.includes(url)) {

        const modelName = url.split('/')[2];
        const model = handleModelName(modelName, models);

        try {
            const data = await model.findAll();
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
            return;
        } catch (e) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(e));
            return;
        }

    }

    if (url === "/") {
        const file = fs.readFileSync("./index.html");
        res.end(file);
        return;
    }

    const code = url.split('/')[3];
    const extraModel = url.split('/')[4];

    if (url.startsWith('/api/faculties') && extraModel === "subjects" && code) {
        try {
            if (!await models.FACULTY.findByPk(code)){
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify("Not found"));
                return;
            }

            const data = await models.FACULTY.findByPk(
                code, {
                include: [
                    {
                        model: models.PULPIT,
                        as: "PULPITs",
                        required: false,
                        attributes: ["PULPIT", "PULPIT_NAME"],
                        include: [
                            {
                                model: models.SUBJECT,
                                as: "SUBJECTs",
                                required: true,
                                attributes: ["SUBJECT", "SUBJECT_NAME"],
                            },
                        ],
                    },
                ],
                attributes: ["FACULTY", "FACULTY_NAME"],
            });

            const { FACULTY, FACULTY_NAME, PULPITs } = data.dataValues;
            const subjects = PULPITs.flatMap(({ SUBJECTs }) => SUBJECTs);
            const results = { FACULTY, FACULTY_NAME, Subjects: subjects };

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(results));
            return;
        } catch (e) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(e.error));
            return;
        }

    }

    if (url.startsWith('/api/auditoriumtypes') && extraModel === "auditoriums" && code) {
        try {
            const data = await models.AUDITORIUM.findAll({
                include: [
                    {
                        model: models.AUDITORIUM_TYPE, 
                        as: "AUDITORIUM_TYPE_AUDITORIUM_TYPE", 
                        required: true, 
                        attributes: [],
                    }
                ],
                where: {
                    'AUDITORIUM_TYPE': code
                },
            });

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
            return;
        } catch (e) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(e));
            return;
        }
    }

    if (url.startsWith('/api/scope')){
        try {
            const data = await models.AUDITORIUM.scope('capacityRange').findAll();
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

module.exports = handleGetRequest;