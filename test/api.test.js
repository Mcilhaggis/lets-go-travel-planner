const db = require("../models");
//const destination = require("../models/itinerary");

// const { request } = require('chai');

describe("userTest", () => {
  describe("Initialization", () => {

    //testing for correct email and password input
    it("should create a user with the correct email and password", async () => {
      const userTest = db.User.create({email:"testtesting@test.com", password:"animals", createdAt:"10-10-10 11:59:00", updatedAt:"10-10-10 12:59:00"});
           
      const foundUser = await db.User.findOne({where: {email: "testtesting@test.com"}});
      // console.log('foud User ',foundUser);         

      expect(foundUser.dataValues.email).toEqual("testtesting@test.com");
      //expect(userTest.password).toEqual("animals");
            
    });

    // //if no email and password are provided
    // it("should throw an error if provided no arguments", () => {
    //     const noInfo = () => new User();

    //     expect(noInfo).toThrow();
    // });

    // //if email is not a string
    // it("should throw an error if 'email' is not a string", () => {
    //     const invalidEmail = () => new User(300, "cat");
    //     const err = new Error("Expected parameter 'email' to be a string");

    //     expect(invalidEmail).toThrowError(err);
    // });
  });
});

// describe("destinationTest", () => {
//     describe("Starting", () => {

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
//     });
// });

