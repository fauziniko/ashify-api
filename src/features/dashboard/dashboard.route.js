const express = require('express');
const { getDashboard } = require('./dashboard.controller');

const router = express.Router();

router.get('/:id_profile', getDashboard);

module.exports = router;
