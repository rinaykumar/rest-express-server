const express = require("express");
const app = express();

app.use(express.json()) // Middleware for json

// Root endpoint, sucess: fails and errorCode: 404
app.get('/', (req, res) => {
  res.json({sucess: false, items: null, inquiries: null, errorCode: 404});
});

// Test endpoint
app.get('/test', (req, res) => {
  res.send('test');
});

// /api/createListing (post)

// /api/viewListings

// /api/viewListings?type=<type>

// /api/deleteListing?id=<id>

// /api/getInquiries?listingId=<listingId>

// /api/makeInquiry (post)

// Random endpoints, sucess: fails and errorCode: 404
app.get('/*', (req, res) => {
  res.json({sucess: false, items: null, inquiries: null, errorCode: 404});
});

module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  app.listen(4000);
}
