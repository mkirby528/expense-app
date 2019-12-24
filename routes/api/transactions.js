const express = require("express");
const router = express.Router();
const Transaction = require("../../models/transaction");


router.get("/", (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Transaction.find({})
    .then(data => res.json(data))
    .catch(next);
});


router.get("/:user", (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Transaction.find({user: req.params.user })
    .then(data => res.json(data))
    .catch(next);
});

router.post("/", (req, res, next) => {
  console.log(req.body)

  if (req.body ) {
    Transaction.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      // error: "The input field is empty"
    });
  }
});

router.put("/:id", (req, res, next) => {
  console.log(req.params.id)
  Transaction.replaceOne({"_id" : (req.params.id)}, req.body)
  .then(data => res.json(data))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Transaction.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
