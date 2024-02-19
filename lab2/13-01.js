const Sequelize = require("sequelize");
const sequelize = new Sequelize("GAY", "sa", "1111", {
  dialect: "mssql",
  host: "localhost",
  port: "1433"
});

