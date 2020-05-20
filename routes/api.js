const express = require('express');
const router = express.Router();

const ShortenedUrl = require('../models/shortenedUrl');

const dns = require('dns');

router.post('/shorturl/new', (req, res) => {
  const originalUrl = req.body.url;

  try {
    new URL(originalUrl);

    const domain = originalUrl.match(/https?:\/\/([-.a-zA-Z]*)/)[1];

    dns.lookup(domain, async (error) => {
      if (error) {
        return res.json({
          error: 'Website not found'
        });
      }

      const shortenedUrl = new ShortenedUrl({
        originalUrl
      });

      try {
        const saved = await shortenedUrl.save();

        return res.json({
          original_url: originalUrl,
          short_url: saved._id
        });
      } catch(e) {
        return res.json({
          error: 'Error shortening the URL'
        });
      }
      
    });

  } catch(e) {
    return res.json({
      error: 'invalid URL'
    });
  }
});

router.get('/shorturl/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const shortenedUrl = await ShortenedUrl.findById(id);
    return res.redirect(shortenedUrl.originalUrl);
  } catch(e) {
    return res.json({
      error: 'Error getting the URL'
    });
  }
});

module.exports = router;
