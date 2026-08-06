const Photographer = require("../models/Photographer");

// @desc   Get all photographers
// @route  GET /api/photographers
// @access Public
const getPhotographers = async (req, res) => {
  const { featured } = req.query;
  const filter = featured === "true" ? { featured: true } : {};
  const photographers = await Photographer.find(filter).sort({ createdAt: -1 });
  res.json(photographers);
};

// @desc   Get single photographer
// @route  GET /api/photographers/:id
// @access Public
const getPhotographer = async (req, res) => {
  const photographer = await Photographer.findById(req.params.id);
  if (!photographer) {
    return res.status(404).json({ message: "Photographer not found" });
  }
  res.json(photographer);
};

// @desc   Create photographer
// @route  POST /api/photographers
// @access Private/Admin
const createPhotographer = async (req, res) => {
  const {
    name, specialty, coverImage, avatar, rating, bookings,
    price, experience, available, verified, featured, portfolio,
  } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const photographer = await Photographer.create({
    name, specialty, coverImage, avatar, rating, bookings,
    price, experience, available, verified, featured, portfolio: portfolio || [],
  });
  res.status(201).json(photographer);
};

// @desc   Update photographer
// @route  PUT /api/photographers/:id
// @access Private/Admin
const updatePhotographer = async (req, res) => {
  const photographer = await Photographer.findById(req.params.id);
  if (!photographer) {
    return res.status(404).json({ message: "Photographer not found" });
  }
  const fields = [
    "name", "specialty", "coverImage", "avatar", "rating", "bookings",
    "price", "experience", "available", "verified", "featured", "portfolio",
  ];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) photographer[field] = req.body[field];
  });
  await photographer.save();
  res.json(photographer);
};

// @desc   Delete photographer
// @route  DELETE /api/photographers/:id
// @access Private/Admin
const deletePhotographer = async (req, res) => {
  const photographer = await Photographer.findById(req.params.id);
  if (!photographer) {
    return res.status(404).json({ message: "Photographer not found" });
  }
  await photographer.deleteOne();
  res.json({ message: "Photographer removed" });
};

module.exports = {
  getPhotographers,
  getPhotographer,
  createPhotographer,
  updatePhotographer,
  deletePhotographer,
};