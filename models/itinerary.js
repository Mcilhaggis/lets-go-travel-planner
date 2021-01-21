//Require sequelize
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Itinerary = sequelize.define(
        "Itinerary", {
            //
            destination: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            memberId: Sequelize.INTEGER, // MemberId will be used as a foreign key with User.Id to linnk the two tables
            activityId: Sequelize.INTEGER,
            activityName: Sequelize.STRING,
            restaurantName: Sequelize.STRING,
        }, {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false, // Removing teh createdAt and updatedAt defualt columns from this table
        }
    );

    Itinerary.associate = (models) => {
        // We're saying that a Itinerary should belong to a User
        // A Itinerary can't be created without a User due to the foreign key constraint
        Itinerary.belongsTo(models.User, {
            foreignKey: {
                memberId: Sequelize.INTEGER,
            },
        });
    };

    return Itinerary;
};