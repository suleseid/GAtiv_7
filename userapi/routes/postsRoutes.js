const router = require("express").Router();
const verify = require("../verifyToken");

// Protected route to get user information
router.get("/", verify, (req, res) => {
  console.log("User Data in Protected Route:", req.user); // Add this line
  res.send(req.user);
});

module.exports = router;
