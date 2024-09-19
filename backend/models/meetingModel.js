const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const Meeting = sequelize.define("meetings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: DataTypes.STRING,
  link: DataTypes.STRING,
  slots: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Meeting;
