const express = require('express');
const router = express.Router();

const companies = require('../../data/companies.json');

router.get('/', (req, res) => {
  res.status(200).json(companies);
});

module.exports = router;