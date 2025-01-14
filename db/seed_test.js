const Bookmark = require("../models/bookmark.js");
const { connectDB } = require("../db/init.js");

const seedTestDB = async () => {
  await connectDB();
  await Bookmark.sync({ force: true });

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

  console.log("Test database seeded");
  process.exit(0);
};

seedTestDB();
