const request = require("supertest");
const app = require("../app.js");
const { sequelize } = require("../db/init.js");
const Bookmark = require("../models/bookmark.js");

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Bookmark.bulkCreate([
    {
      url: "https://example.com",
      title: "Example",
      description: "Example Bookmark",
    },
    {
      url: "https://google.com",
      title: "Google",
      description: "Search engine",
    },
  ]);
});

afterAll(async () => {
  await sequelize.close();
});

describe("Bookmarkly App API Tests", () => {
  it("should get all bookmarks", async () => {
    const res = await request(app).get("/bookmarks");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });
});
