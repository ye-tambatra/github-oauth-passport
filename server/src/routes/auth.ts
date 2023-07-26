import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout(function (error) {
      if (error) return res.json({ success: false }).status(500);
      return res.json({ success: true });
    });
    return;
  }
  res.json({ success: true, message: "The user is not even logged in." });
});
router.get("/login", passport.authenticate("github"));
router.get(
  "/login/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL as string,
  })
);
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ success: true, response: true, user: req.user });
  }
  res.json({ success: true, response: false });
});

export default router;
