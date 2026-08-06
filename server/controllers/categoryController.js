const Category = require("../models/Category");

// @desc   Get all categories
// @route  GET /api/categories
// @access Public
const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};

// @desc   Create category
// @route  POST /api/categories
// @access Private/Admin
const createCategory = async (req, res) => {
  const { name, icon, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const category = await Category.create({ name, icon, description });
  res.status(201).json(category);
};

// @desc   Update category
// @route  PUT /api/categories/:id
// @access Private/Admin
const updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  category.name = req.body.name || category.name;
  category.icon = req.body.icon || category.icon;
  category.description = req.body.description || category.description;
  await category.save();
  res.json(category);
};

// @desc   Delete category
// @route  DELETE /api/categories/:id
// @access Private/Admin
const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  await category.deleteOne();
  res.json({ message: "Category removed" });
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };