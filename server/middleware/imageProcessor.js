const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Middleware that runs AFTER multer has saved the raw upload locally.
 *
 * Uploads the raw image to Cloudinary and replaces the local filename with the
 * Cloudinary secure URL. This ensures images persist on a cloud CDN that
 * survives server restarts / redeploys (unlike the ephemeral local filesystem).
 *
 * If Cloudinary is not configured, it falls back to keeping the local file so
 * the app still works locally.
 *
 * Usage:  upload.single("image"), optimizeImage, handler
 */
function optimizeImage(req, res, next) {
  // No image was uploaded — nothing to do.
  if (!req.file) {
    return next();
  }

  const { path: filePath, filename } = req.file;

  // If Cloudinary credentials are missing, keep the local file as-is.
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    req.file.filename = path.basename(filePath);
    return next();
  }

  // Upload to Cloudinary.
  cloudinary.uploader.upload(
    filePath,
    { folder: "meenakshistudio", resource_type: "image" },
    (error, result) => {
      // Always clean up the local temp file.
      fs.unlink(filePath, () => {});

      if (error || !result) {
        console.error("Cloudinary upload failed:", error);
        // Fall back to local file so the request still works.
        req.file.filename = filename;
        return next();
      }

      // Replace filename with the Cloudinary secure URL.
      req.file.filename = result.secure_url;
      next();
    },
  );
}

module.exports = optimizeImage;
