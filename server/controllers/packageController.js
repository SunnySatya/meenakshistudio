const Package = require("../models/Package");

// @desc   Get all packages
// @route  GET /api/packages
// @access Public
const getPackages = async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
};

// @desc   Create package
// @route  POST /api/packages
// @access Private/Admin
const createPackage = async (req, res) => {
  const { name, icon, price, featured, features, disabledFeatures } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }
  const pkg = await Package.create({
    name,
    icon: icon || "📦",
    price,
    featured: featured || false,
    features: features || [],
    disabledFeatures: disabledFeatures || [],
  });
  res.status(201).json(pkg);
};

// @desc   Update package
// @route  PUT /api/packages/:id
// @access Private/Admin
const updatePackage = async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    return res.status(404).json({ message: "Package not found" });
  }
  const fields = ["name", "icon", "price", "featured", "features", "disabledFeatures"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) pkg[field] = req.body[field];
  });
  await pkg.save();
  res.json(pkg);
};

// @desc   Delete package
// @route  DELETE /api/packages/:id
// @access Private/Admin
const deletePackage = async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    return res.status(404).json({ message: "Package not found" });
  }
  await pkg.deleteOne();
  res.json({ message: "Package removed" });
};

module.exports = { getPackages, createPackage, updatePackage, deletePackage };