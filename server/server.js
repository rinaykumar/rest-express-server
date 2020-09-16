const express = require("express");
const {nanoid} = require('nanoid');
const app = express();

app.use(express.json())

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
app.get('/api/getInquiries', (req, res) => {
  let id = req.query.listingId;
  let itemIndex = items.findIndex(item => item.id === id);

  if (itemIndex < 0) {
    res.json({sucess: true, items: items, inquiries: 0, errorCode: null});
  } else {
    res.json({sucess: true, items: items, inquiries: items[itemIndex].inquiries, errorCode: null});
  }
});

// /api/makeInquiry (post)
app.post('/api/makeInquiry', (req, res) => {
  let id = req.query.listingId;
  let message = req.body.message;
  let inquiry = new Object();
  let inquiries = [];
  let itemIndex = items.findIndex(item => item.id === id);

  if (itemIndex < 0) {
    res.json({sucess: false, items: items, inquiries: null, errorCode: null});
  } else {
    inquiry.message = message;
    inquiry.id = id;
    inquiries.push(inquiry);
    items[itemIndex].inquiries = inquiries;
    res.json({sucess: true, items: items, inquiries: items[itemIndex].inquiries, errorCode: null});
  }
});

// Random endpoints, sucess: fails and errorCode: 404
app.get('/*', (req, res) => {
  res.json({sucess: false, items: null, inquiries: null, errorCode: 404});
});

module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  app.listen(4000);
}
