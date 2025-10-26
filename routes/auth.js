const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, profilePic } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, profilePic });
  await user.save();
  res.send("Usuario registrado");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Credenciales inválidas");
  }
  const token = jwt.sign({ username: user.username, profilePic: user.profilePic }, "secreto");
  res.json({ token });
});

module.exports = router;
