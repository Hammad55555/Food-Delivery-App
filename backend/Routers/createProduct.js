const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { getCachedData } = require("../db");

router.post("/sam", async (req, res) => {
  try {
    const newProduct = new Product({
      CategoryName: req.body.CategoryName,
      name: req.body.name,
      img: req.body.img,
      options: req.body.options,
      description: req.body.description,
    });

    // Save the new product to the MongoDB collection
    await newProduct.save();

    res.status(201).send({ success: true, message: "Product created successfully" });

    // Update the cached data after saving the product
    const cachedData = getCachedData();
    cachedData.food_items.push(newProduct); // Add the newProduct to the cached array
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/displayData', async (req, res) => {
  try {
    const cachedData = getCachedData();
   
    res.send([cachedData.food_items, cachedData.food_category]);
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
