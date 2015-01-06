var express = require('express');

var api = express.Router();

api.use('/api',
    require('./tcx-route'));

module.exports = api;