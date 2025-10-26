const express = require("express");
const jwt = require("jsonwebtoken");
const Report = require("../models/Report");
const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No autorizado");

  const decoded = jwt.verify(token, "secreto");
  const { title, description, location, lat, lon } = req.body;

  const report = new Report({
    title,
    description,
    location,
    lat,
    lon,
    user: {
      username: decoded.username,
      profilePic: decoded.profilePic,
    },
  });

  await report.save();
  res.send("Reporte guardado");
});

module.exports = router;
