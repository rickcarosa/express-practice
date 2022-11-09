const express = require("express");
const { route } = require("./theRouter");
let router = express.Router();

function validateUser(req, res, next) {
  res.locals.validated = true;
  next();
}

// validateUser is middleware that will only be added to this router.
// in other words the main router doesn't know about it
route.use(validateUser);

router.get("/", (req, res, next) => {
  res.json({
    msg: "User Router works",
  });
});

module.exports = router;
