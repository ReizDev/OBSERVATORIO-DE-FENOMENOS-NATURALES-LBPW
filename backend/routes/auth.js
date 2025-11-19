const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Telegram (usa su widget, aquí validarías los datos recibidos)
router.get("/telegram/callback", (req, res) => {
  // Validar datos firmados de Telegram
  res.redirect("/dashboard");
});

module.exports = router;
