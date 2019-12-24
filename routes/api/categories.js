const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");

router.get("/", (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    Category.find({})
      .then(data => res.json(data))
      .catch(next);
  });
  router.get("/:user", (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    Category.find({user:req.params.user})
      .then(data => res.json(data))
      .catch(next);
  });

  router.post("/", (req, res, next) => {
    console.log(req.body)
  
    if (req.body ) {
      Category.create(req.body)
        .then(data => res.json(data))
        .catch(next);
    } else {
      res.json({
        // error: "The input field is empty"
      });
    }
  });
  
  router.delete("/:id", (req, res, next) => {
    Category.findOneAndDelete({ _id: req.params.id })
      .then(data => res.json(data))
      .catch(next);
  });

  module.exports = router;
