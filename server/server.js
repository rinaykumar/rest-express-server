const express = require("express");
const app = express();

// Todo: Make endpoints

module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  app.listen(4000);
}
