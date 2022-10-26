var express = require('express');
var router = express.Router();

const Item = require('../models/Item.model')

router.get('/', (req, res, next) => {
  Item.find()
    .then((items) => {
      res.json({ items: items });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    })
});

router.get('/:id/my-items', (req, res, next) => {
  Item.find({contributor: req.params.id})
    .then((myItems) => {
      res.json({myItems: myItems})
    })
    .catch((err) => {
      res.status(400).json(err.message);
    })
});

router.post('/add-item', (req, res, next) => {
  Item.create({
      name: req.body.name,
      description: req.body.description,
      contributor: req.body.contributor
      })
    .then((result) => {
      res.json({result})
    })
    .catch((err) => {
      res.status(400).json(err.message);
    })
})

module.exports = router;