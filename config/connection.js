const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-network-API');

module.exports = mongoose.connection;