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
            memberId: Sequelize.INTEGER,
            activityId: Sequelize.INTEGER,
            activityName: Sequelize.STRING,
            restaurantName: Sequelize.STRING,
        }, {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false,
        }
    );

    // Itinerary.associate = (models) => {
    //     Itinerary.belongsTo(models.User, { foreignKey: 'memberId', as: 'id' });
    // };

    Itinerary.associate = (models) => {
        // We're saying that a Itinerary should belong to an Author
        // A Itinerary can't be created without an Author due to the foreign key constraint
        Itinerary.belongsTo(models.User, {
            foreignKey: {
                memberId: Sequelize.INTEGER,
            },
        });
    };

    return Itinerary;
};