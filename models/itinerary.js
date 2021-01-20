//Require sequelize
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Itinerary = sequelize.define(
    "Itinerary",
    {
      //
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      memberId: Sequelize.INTEGER,
      activityId: Sequelize.INTEGER,
      activityName: Sequelize.STRING,
      restaurantName: Sequelize.STRING,
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,
    }
  );

  return Itinerary;
};
