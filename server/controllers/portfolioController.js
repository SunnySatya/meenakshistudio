const Portfolio = require("../models/Portfolio");

// @desc   Get all portfolio items
// @route  GET /api/portfolio
// @access Public
const getPortfolio = async (req, res) => {
  const items = await Portfolio.find().sort({ createdAt: -1 });
  res.json(items);
};

// @desc   Create portfolio item
// @route  POST /api/portfolio
// @access Private/Admin
const createPortfolio = async (req, res) => {
  let image = req.body.image || "";
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }
  const { title, category, photographer, featured } = req.body;
  if (!title || !image) {
    return res.status(400).json({ message: "Title and image are required" });
  }
  const item = await Portfolio.create({
    title,
    image,
    category: category || "",
    photographer: photographer || "",
    featured: featured !== undefined ? featured : true,
  });
  res.status(201).json(item);
};

// @desc   Update portfolio item
// @route  PUT /api/portfolio/:id
// @access Private/Admin
const updatePortfolio = async (req, res) => {
  const item = await Portfolio.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Portfolio item not found" });
  }
  item.title = req.body.title || item.title;
  item.category = req.body.category !== undefined ? req.body.category : item.category;
  item.photographer = req.body.photographer !== undefined ? req.body.photographer : item.photographer;
  item.featured = req.body.featured !== undefined ? req.body.featured : item.featured;
  if (req.file) {
    item.image = `/uploads/${req.file.filename}`;
  } else if (req.body.image) {
    item.image = req.body.image;
  }
  await item.save();
  res.json(item);
};

// @desc   Delete portfolio item
// @route  DELETE /api/portfolio/:id
// @access Private/Admin
const deletePortfolio = async (req, res) => {
  const item = await Portfolio.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Portfolio item not found" });
  }
  await item.deleteOne();
  res.json({ message: "Portfolio item removed" });
};

module.exports = { getPortfolio, createPortfolio, updatePortfolio, deletePortfolio };