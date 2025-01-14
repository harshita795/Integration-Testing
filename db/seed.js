const Bookmark = require("../models/bookmark.js");
const { connectDB } = require("../db/init.js");

const seedDB = async () => {
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

  console.log("Database seeded");
  process.exit(0);
};

seedDB();
