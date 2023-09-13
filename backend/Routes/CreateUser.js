const express = require("express");
const router = express.Router();
require('dotenv').config();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.REACT_APP_JWT_SECRET;
router.post(
  process.env.REACT_APP_CREATEUSER,

  [
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("name").isLength({ min: 3 }),
    body("password", "include atleast 8 characters").isLength({ min: 8 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(process.env.REACT_APP_BICRYPT_SALT);
    let secPassword = await bcrypt.hash(req.body.password,salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      
      res.json({ success: false });
    }
  }
);

router.post(
  process.env.REACT_APP_LOGINUSER_URL,
  [
    body("email").isEmail(),

    body("password", "include atleast 8 characters").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    let password = req.body.password;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      const pwdCompare = await bcrypt.compare(password,userData.password);
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      const data = {
        user:{
          id : userData._id
        }
      }

      const authToken = jwt.sign(data,jwtSecret)
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      
      res.json({ success: false });
    }
  }
);

module.exports = router;
