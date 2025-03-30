const express = require('express');
const { summerize } = require('../controllers/summarize.controller.js');
const router = express.Router();

router.post('/summerize', summerize);

module.exports = router;