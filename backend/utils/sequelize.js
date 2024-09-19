const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  username: "root",
  password: "root",
  database: "node-app",
  timezone: "+05:30",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.log("Unable to connect to the database: ", err));

module.exports = sequelize;
