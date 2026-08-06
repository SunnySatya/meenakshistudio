const Testimonial = require("../models/Testimonial");

// @desc   Get all testimonials
// @route  GET /api/testimonials
// @access Public
const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
};

// @desc   Create testimonial
// @route  POST /api/testimonials
// @access Private/Admin
const createTestimonial = async (req, res) => {
  const { name, role, avatar, rating, text } = req.body;
  if (!name || !text) {
    return res.status(400).json({ message: "Name and text are required" });
  }
  const testimonial = await Testimonial.create({
    name,
    role: role || "",
    avatar: avatar || "",
    rating: rating || 5,
    text,
  });
  res.status(201).json(testimonial);
};

// @desc   Update testimonial
// @route  PUT /api/testimonials/:id
// @access Private/Admin
const updateTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ message: "Testimonial not found" });
  }
  const fields = ["name", "role", "avatar", "rating", "text"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) testimonial[field] = req.body[field];
  });
  await testimonial.save();
  res.json(testimonial);
};

// @desc   Delete testimonial
// @route  DELETE /api/testimonials/:id
// @access Private/Admin
const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ message: "Testimonial not found" });
  }
  await testimonial.deleteOne();
  res.json({ message: "Testimonial removed" });
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };