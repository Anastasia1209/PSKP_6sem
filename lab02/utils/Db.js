const {initModels} = require('../models/initModels');
const {Sequelize} = require("sequelize");


const connection = new Sequelize('GAY', 'sa', '1111', {
    host: 'localhost',
    dialect: 'mssql',
    port: 1433,
    pool: {
        min: 0,
        max: 10
    },
    define: {
        hooks: {
            beforeDestroy() {
                console.log('beforeDestroy');
            }
        }
    }
});

const models = initModels(connection);

module.exports = {models,connection};

