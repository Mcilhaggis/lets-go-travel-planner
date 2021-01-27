//Require sequelize
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Itinerary = sequelize.define(
        "Itinerary", {
            memberId: Sequelize.INTEGER, // MemberId will be used as a foreign key with User.Id to link the two tables

            destination: {
                type: DataTypes.STRING,
                allowNull: false
            },
            restaurantWebsite: Sequelize.STRING,
            restaurantName: Sequelize.STRING,
            restaurantAddress: Sequelize.STRING,
            restaurantPhone: Sequelize.STRING,
            restaurantPhoto: Sequelize.STRING,
            activityName: Sequelize.STRING,
            activityPhoto: Sequelize.STRING,
            activityDescription: Sequelize.TEXT,
            activityWebsite: Sequelize.STRING,
            comments: {
                type: DataTypes.TEXT,
                allowNull: true,
                len: [1],
            }
        }, {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false // Removing the createdAt and updatedAt defualt columns from this table
        }
    );
    Itinerary.associate = models => {
        // We're saying that a Itinerary should belong to a User
        // A Itinerary can't be created without a User due to the foreign key constraint
        Itinerary.belongsTo(models.User, {
            foreignKey: {
                memberId: Sequelize.INTEGER
            }
        });
    };
    return Itinerary;
};