const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const Schedule = sequelize.define("schedules", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  time: DataTypes.STRING,
  link: DataTypes.STRING,
});

module.exports = Schedule;
