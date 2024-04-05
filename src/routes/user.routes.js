import { Router } from "express";
import { registerUser, loginUser, logOutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../utils/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// *** Routes ***
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token", refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

export default router;
