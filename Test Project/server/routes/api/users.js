const { Router } = require("express");
const Userdata = require("../../models/userdata");
const bcrypt = require("bcryptjs");
const User = require("../../models/userdata");
const joi = require("joi");
const router = Router();
const jwt = require("jsonwebtoken");

////////////////////////////////////////////////
// validation schemas
const signup_schema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});
//----------------------------------------------
const login_schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
//------------------ SingUp process ---------------------

router.post("/signup", async (req, res) => {
  //form control
  const isvalid = signup_schema.validate(req.body);
  if (isvalid.error) {
    console.log(isvalid.error.details[0].message);
    return res.json({ message: isvalid.error.details[0].message });
  }
  // hashing passwords
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      useremail: req.body.email,
      username: req.body.username,
      password: hash,
    });
    //checking if email already exists to avoid duplicates
    User.findOne({ email: req.body.email })
      .then((user1) => {
        if (user1) {
          return res.json({
            message: "User Already Exist",
          });
        }
        //saving user
        user.save().then((result) => {
          if (!result) {
            return res.status(500).json({
              message: "Error Creating USer",
            });
          }
          res.status(201).json({
            message: "User created!",
            result: result,
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

//------------------ SingIn process ---------------------

router.post("/signin", async (req, res) => {
  console.log(req.body);
  //form control
  const isvalid = login_schema.validate(req.body);
  if (isvalid.error) {
    return res.json({ message: isvalid.error.details[0].message });
  }
  //checking if user exists
  const user = await User.findOne({ useremail: req.body.email });
  if (!user) {
    return res.json({
      message: "Auth failed no such user",
    });
  } else {
    //comparing passowrds to check if the user typed the correct password
    return bcrypt
      .compare(req.body.password, user.password)

      .then((result) => {
        if (!result) {
          return res.json({
            message: "Auth failed inccorect password",
          });
        }
        //creating jwt token
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          "secret",
          { expiresIn: "36h" }
        );
        res.status(200).json({
          token: token,
          userId: user._id,
          username: user.username,
          email: user.email,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
});
//---------------------fetching user-------------------

router.post("/fetch", (req, res) => {
  User.findOne({ _id: req.body.id }, (err, doc) => {
    if (!err && doc) {
      return res.send(doc);
    }
    return res.send("error occured");
  });
});
//-----------------------------delete user------------------------------
router.post("/delete", (req, res) => {
  console.log(req.body);
  User.findOneAndDelete({ _id: req.body.id }, (err, doc) => {
    if (!err && doc) {
      return res.send("deleted");
    }
    return res.send("error occured");
  });
});
module.exports = router;
