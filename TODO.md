# TODO: Remove all Site Settings related content

## Backend

- [x] Delete `server/models/SiteSettings.js`
- [x] Delete `server/controllers/settingsController.js`
- [x] Delete `server/routes/settingsRoutes.js`
- [x] Delete `server/update-announce.js`
- [x] Edit `server/server.js` — remove settingsRoutes import and /api/settings route
- [x] Edit `server/seed.js` — remove SiteSettings import, deleteMany, and seeding block

## Frontend

- [x] Edit `client/src/pages/Home.jsx` — remove settings state and API call
- [x] Edit `client/src/components/Hero.jsx` — remove settings prop and announcement fallback
- [x] Edit `client/src/pages/admin/Dashboard.jsx` — remove settings mention

## Database

- [x] Clear `sitesettings` collection from MongoDB Atlas

## Verify

- [x] Start server and confirm no errors
- [x] Confirm sitesettings collection removed from Atlas
