import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "./auth.validation";
import { asyncHandler } from "../utils/asyncHandler";
import passport from "passport";
import { config } from "../config";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register.bind(authController))
);
router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login.bind(authController))
);

// Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: config.google.successRedirect,
    failureRedirect: config.google.failureRedirect,
  })
);
router.get("/me", authMiddleware, asyncHandler(authController.getProfile.bind(authController)));

router.get("/verify-email/:token", asyncHandler(authController.verifyEmail.bind(authController)));

export default router;
