const path = require("path");

/**
 * Middleware that runs AFTER multer has saved the raw upload.
 *
 * Images are stored EXACTLY as uploaded to preserve full original quality —
 * no resizing and no recompression. This keeps every pixel of the user's
 * photo intact.
 *
 * Site speed is instead handled by:
 *   - HTTP caching headers on the /uploads static route (server.js)
 *   - lazy-loading gallery images on the frontend (Portfolio.jsx)
 *
 * Usage:  upload.single("image"), optimizeImage, handler
 */
function optimizeImage(req, res, next) {
  // No image was uploaded — nothing to do.
  if (!req.file) {
    return next();
  }

  // Keep the original file untouched. The stored filename and URL remain valid.
  req.file.filename = path.basename(req.file.path);
  next();
}

module.exports = optimizeImage;
