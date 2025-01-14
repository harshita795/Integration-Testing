const express = require("express");
const Bookmark = require("../models/bookmark.js");
const router = express.Router();

//  Get all books
router.get("/", async (req, res) => {
  try {
    const bookmarkData = await Bookmark.findAll();
    res.status(200).json({
      message: "Bookmarks fetched successfully",
      Bookmarks: bookmarkData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching bookmarks data",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { url, tile, description } = req.body;
    const newBookmark = await Bookmark.create({ url, tile, description });

    res.status(201).json({
      message: "New Bookmark created successfully.",
      addedBookmark: newBookmark,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in creating bookmarks data",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { favorite, read, archived } = req.body;

    const updatedBookmark = await Bookmark.findOne({ where: { id } });

    if (!updatedBookmark) {
      res.status(400).json({ message: "Bookmark not found." });
    }

    if (favorite !== undefined) updatedBookmark.favorite = favorite;
    if (read !== undefined) updatedBookmark.read = read;
    if (archived !== undefined) updatedBookmark.archived = archived;

    await updatedBookmark.save();

    res
      .status(200)
      .json({ message: "Bookmark updated successfully.", updatedBookmark });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating bookmarks data",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedBookmark = await Bookmark.destroy({ where: { id } });

    if (!deletedBookmark) {
      res.status(400).json({ message: "Bookmark not found." });
    }

    res.status(200).json({
      message: `Bookmark deleted successfully with BookmarkId: ${id}.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting bookmarks data",
      error: error.message,
    });
  }
});

module.exports = router;
