const Item = require("../models/Item.model");
const jwt = require('jsonwebtoken')

const isContributor = (req, res, next) => {
  // console.log(foundItem.contributor._id, "contributor id")

  let user = jwt.verify(req.headers.authorization?.split(" ")[1], process.env.SECRET)._id

  // console.log(req.headers.authorization?.split(" ")[1], "AUTH HEADERS")
// console.log(jwt.verify(req.headers.authorization?.split(" ")[1], process.env.SECRET)._id, "TOKEN INFO");
// console.log(req.params.id, "PARAMS")
  // req.user = tokenInfo;




  Item.findById(req.params.id)
    .populate("contributor")
    .then((foundItem) => {
      console.log(foundItem.contributor._id.toHexString(), "FOUND CONTRIBUTOR")
      console.log(user, "USER")
      if (foundItem.contributor._id.toHexString() === user) {
        console.log("MATCHING")
        next();
      } else {
        return res.status(400).json({
          message: "You are not authorized to delete this item.",
        });
      }
    });
};

module.exports = isContributor;


// const jwt = require("jsonwebtoken");

// const isLoggedIn = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token || token === "null") {
//     return res.status(400).json({ message: "Token not found" });
//   }
 
//   try {
//     const tokenInfo = jwt.verify(token, process.env.SECRET);
//     req.user = tokenInfo;
//     next();
//   } catch (error) {
//     console.log(error.message, "Error.message")
//     return res.status(401).json(error);
//   }
// };

// module.exports = isLoggedIn;