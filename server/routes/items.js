var express = require('express');
var router = express.Router();

const Item = require('../models/Item.model')

router.get('/', function(req, res, next) {
  Item.find()
    .then((items) => {
      res.json({ items: items });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    })
});

module.exports = router;