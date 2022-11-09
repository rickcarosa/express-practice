const express = require("express");
let router = express.Router();

// router.use works the same as app.use, but is specific to this route

router.get("/", (req, res, next) => {
  res.json({
    msg: "Router works",
  });
});

module.exports = router;
