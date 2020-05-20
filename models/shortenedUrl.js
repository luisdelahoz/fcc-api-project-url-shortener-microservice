const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortenedUrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true
  }
});

const shortenedUrl = mongoose.model('ShortenedUrl', shortenedUrlSchema);

module.exports = shortenedUrl;