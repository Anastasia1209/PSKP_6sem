const handleModelName = require("../utils/handleModelName");
const handleRequestBody = require("../utils/handleRequestBody");
const Sequelize = require("sequelize");
const timeout = require("../utils/timeout");

const handlePutRequest = async (req, res, models, connection) => {

    const ENDPOINTS = [
        '/api/faculties',
        '/api/pulpits',
        '/api/subjects',
        '/api/auditoriumstypes',
        '/api/auditoriums',
        '/api/teachers',
    ];

    const url = req.url;

    if (ENDPOINTS.includes(url)) {

        const modelName = url.split('/')[2];
        const model = handleModelName(modelName, models);

        const body = await handleRequestBody(req);
        console.log(body);

        try {

            const primaryKey = model.primaryKeyAttribute;
            const record = await model.findByPk(body[primaryKey]);

            if (record) {
                const data = await record.update(body);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(data));
                return;
            }
            else {
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

    if (url.startsWith("/api/transaction")) {


        const transaction = await connection.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
        });

        try {
            await models.AUDITORIUM.update({AUDITORIUM_CAPACITY: 0}, {where: {}, transaction: transaction,});

            const valuesTransaction = await models.AUDITORIUM.findAll({transaction: transaction, attributes: ["AUDITORIUM_CAPACITY"],});

            console.log(valuesTransaction.map(x => x.dataValues.AUDITORIUM_CAPACITY));


            await timeout(10000);

            console.log("-----------------------------")

            await transaction.rollback();

            const aftertrans = await models.AUDITORIUM.findAll({attributes: ["AUDITORIUM_CAPACITY"],});

            console.log(aftertrans.map(x => x.dataValues.AUDITORIUM_CAPACITY));

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify("transaction ended"));
            return;
        } catch (error) {
            await transaction.rollback();
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(error));
            return;
        }
    }
};

module.exports = handlePutRequest;

