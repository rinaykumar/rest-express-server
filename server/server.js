const express = require("express");
const bodyParser = require("body-parser");
const {nanoid} = require('nanoid');
const app = express();

app.use(express.json())
app.use(bodyParser.json());

// Items database
let items = [];

// Root endpoint, sucess: fails and errorCode: 404
app.get('/', (req, res) => {
  res.json({sucess: false, items: null, inquiries: null, errorCode: 404});
});

// /api/createListing (post)
app.post('/api/createListing', (req, res) => {
  let item = new Object();
  
  item.description = req.body.description;
  item.type = req.body.type;
  item.price = req.body.price;
  item.title = req.body.title;
  item.id = nanoid(8);

  items.push(item);

  res.json({sucess: true, items: items, inquiries: null, errorCode: null});
});

// /api/viewListings
app.get('/api/viewListings', (req, res) => {
  res.json({sucess: true, items: items, inquiries: null, errorCode: null});
});

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
