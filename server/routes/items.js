var express = require('express');
var router = express.Router();

const isContributor = require('../middleware/isContributor')

const Item = require('../models/Item.model')
const User = require('../models/User.model')

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
    .then((addedItem) => {
      // console.log(res.json({addedItem}), "AFTER ADD")
      res.json({addedItem})
      // res.json(result.data)
    })
    .catch((err) => {
      res.status(400).json(err.message);
    })
})

router.get('/:id/this-item', (req, res, next) => {
  Item.findById(req.params.id)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      res.status(400).json(err.message);
    })
});

router.post('/:id/update-item', (req, res, next) => {
  console.log(req.body, "this is req.body")
  Item.findByIdAndUpdate(req.params.id, {...req.body.item}, {new: true})
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      res.status(400).json(err.message);
    })
});

router.post("/:id/delete-item", 
isContributor, 
(req, res, next) => {
  
  // console.log(req, "This is the user from the route")
  console.log(req.params.id, "This is ID from the params")
  console.log("MADE IT THIS FAR")

  // Photo.findByIdAndRemove(req.params.id)
  //   .then(function () {
  //     res.json({ message: "photo deleted" });
  //   })
  //   .catch(function (error) {
  //     res.json(error);
  //   });
});

module.exports = router;