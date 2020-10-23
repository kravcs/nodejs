const assert = require("assert");
const request = require("supertest");

describe("Book catalog", function() {
    it("should support CRUD lifecycle", async function() {
        const db = await require("../../src/db");
        const app = require("../../src/app")(db);
        const client = request(app);

        const createResult = await client
            .post('/book')
            .send({
                title: "JavaScript in Action",
                authors: ["James Smith", "Kate Donovan"],
                isbn: "9123456788",
                description: "The ultimate JS book!"
            })
            .set('Content-Type', 'application/json')
            .expect(302);

        await client
            .get(createResult.header.location)
            .set('Accept', 'application/json')
            .expect(200, {
            title: "JavaScript in Action",
            slug: "javascript-in-action",
            authors: ["James Smith", "Kate Donovan"],
            isbn: "9123456788",
            description: "The ultimate JS book!"
        });
    });
});

