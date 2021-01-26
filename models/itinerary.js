//Require sequelize
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Itinerary = sequelize.define(
        "Itinerary", {
            memberId: Sequelize.INTEGER, // MemberId will be used as a foreign key with User.Id to link the two tables
            // destination: {
            //     type: DataTypes.STRING,
            //     allowNull: false
            // },
            // activityId: Sequelize.INTEGER,
            // activityImageURL: Sequelize.STRING,
            // activityName: Sequelize.STRING,
            // activityDescription: Sequelize.STRING,
            // restaurantURL: Sequelize.STRING,
            restaurantName: Sequelize.STRING,
            // restaurantDescription: Sequelize.STRING,
            // restaurantPhoto: Sequelize.STRING, // Photo URL
            // restaurantLocation: Sequelize.STRING,
            // menuURL: Sequelize.STRING,
            // userRating: Sequelize.INTEGER
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