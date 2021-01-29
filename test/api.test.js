const { Sequelize } = require("../models");
const db = require("../models");
require ("Sequelize");
//const des = require("../models/itinerary");

// const { request } = require('chai');

describe("userTest", () => {
    describe("Initialization", () => {

        //testing for correct email and password input
        it("should create a user with the correct email and password", async () => {
            const userTest = db.User.create({ email: "testtesting@test.com", password: "animals", createdAt: "10-10-10 11:59:00", updatedAt: "10-10-10 12:59:00" });

            let foundUser = await db.User.findOne({ where: { email: 'testtesting@test.com' } });
            // console.log('foud User ',foundUser);         

            expect(foundUser.dataValues.email).toEqual("testtesting@test.com");
            //expect(userTest.password).toEqual("animals");

        });

        //if no email and password are provided
        it("should throw an error if provided no arguments", () => {
            const noInfo = () => new User();

            expect(noInfo).toThrow();
        });

        //     //if email is not a string
        it("should throw an error if 'email' is not a string", () => {
            const invalidEmail = () => new User(300, "cat");

            expect(invalidEmail).toThrow();
        });
    });
});

describe("destinationTest", () => {
    describe("Starting", () => {

        it("should be able to search for a country/city when user enters in the destination input field", async () => {
            const desTest = db.Itinerary.create({ destination: "Toronto", restaurantWebsite: "test", createdAt: "10-10-10 11:59:00", updatedAt: "10-10-10 12:59:00" });

            let foundDes = await db.Itinerary.findOne({ where: { destination: 'Toronto' } });
            console.log('found Destination ', foundDes);

            expect(foundDes.dataValues.destination).toEqual("Toronto");
            //expect(userTest.password).toEqual("animals");

        });

        //         //testing for the destination search
        //         it("should return the destination searched by the user", () => {
        //             const desTest = new destination("Toronto", false);

        //             expect(desTest.type).toEqual("toronto");
        //             expect(desTest.allowNull).toEqual(false);
        //         });

        //if no email and password are provided
        // it("should throw an error if provided no arguments", () => {
        //     const noInfo = () => new User();

        //     expect(noInfo).toThrow();
        // });
    });
});

