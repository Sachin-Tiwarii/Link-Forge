const express = require("express");
const router = express.Router();
const URL = require("../models/Url");
const { nanoid } = require("nanoid");
// =======================
// Create Short URL
// =======================
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "Original URL is required",
      });
    }

    // Generate Random Short Code
   const shortCode = nanoid(4);

    // Save URL
    const newUrl = await URL.create({
      originalUrl,
      shortCode,
    });

    // Send Complete Response
    res.status(201).json({
      success: true,
      message: "Short URL created successfully",

      data: {
        id: newUrl._id,
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
        shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
        clicks: newUrl.clicks,
        createdAt: newUrl.createdAt,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =======================
// Get All URLs
// =======================
router.get("/urls", async (req, res) => {
  try {
    const urls = await URL.find().sort({ _id: -1 });

    res.json(urls);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =======================
// Redirect
// =======================
router.get("/:shortCode", async (req, res) => {
  try {
    const url = await URL.findOne({
      shortCode: req.params.shortCode,
    });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    url.clicks += 1;

    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;