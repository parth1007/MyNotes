const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_TOKEN = "Thisis@string";
const fetchuser = require("../middleware/getuser");

const { body, validationResult } = require("express-validator");




//  ROUTE 1: For creating a new user

router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    // Check for any errors, if error exist return bad request and errors
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // check for dublicate email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, errors: "This email already exits" });
      }

      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_TOKEN);
      success = true;
      res.json({success, authToken });
    } catch (error) {
      res.status(400).send("Some error occured");
    }
  }
);





//ROUTE 2:  For Login using credentials
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {

    let success = false;
    // Check for any errors, if error exist return bad request and errors
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check for dublicate email

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: "email does not exist" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res.status(400).json({ errors: "wrong password" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_TOKEN);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      res.status(400).send("Some error occured");
    }
  }
);





//  ROUTE 3: Get data of user using auth token: login required

router.post("/getUser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(401).send("Some error occured");
  }
});

module.exports = router;
