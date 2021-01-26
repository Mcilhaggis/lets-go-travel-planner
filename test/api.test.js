const { expect, request } = require("chai");
const User = require("../models/user");
const app = require("../controllers/api");
const request = require("supertest");

test("compares password input with the encrypted password", () => {
    const testUser = "testing@testing.com"
    const e = new User({
        email: testUser,
        password: "cat"
    })
    expect(e.validPassword("cat").toBe(true))

})


test("it should return an array of activities", async () => {
    const response = await request(app).get("api/activity", "New york");
    expect(response.statusCode).toBe(200);
})
