# TODO: Cloudinary Cloud Storage Implementation

## Goal

Make admin-uploaded images persist across server restarts by uploading them to Cloudinary (free tier) instead of the ephemeral local filesystem.

## Steps

- [x] 1. Add `cloudinary` dependency to `server/package.json`
- [x] 2. Update `server/middleware/imageProcessor.js` to upload to Cloudinary and delete local temp file
- [x] 3. Update `server/controllers/portfolioController.js` to use Cloudinary URL (backward compatible)
- [x] 4. Update `render.yaml` to add Cloudinary env vars
- [x] 5. Create `.env.example` documenting Cloudinary vars
- [x] 6. Update `README.md` with Cloudinary setup instructions
- [x] 7. Install dependencies (`npm install cloudinary` in server)
- [x] 8. Verify code changes
- [x] 9. Confirm Cloudinary credentials present and valid in server/.env
- [x] 10. Verified real end-to-end upload to Cloudinary succeeds (SUCCESS)

## User Required Actions

- [x] Create free Cloudinary account at cloudinary.com
- [x] Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to server/.env
- [ ] (If deployed) Add the 3 env vars in Render dashboard
- [ ] Restart the server, then re-upload images through admin panel
- [ ] NOTE: Uploaded images must be under Cloudinary's free-tier 10MB file limit
