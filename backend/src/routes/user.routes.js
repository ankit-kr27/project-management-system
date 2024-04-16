import { Router } from "express";
import {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
    updateUserAvatar,
    getAllStudents,
    getAllTeachers, 
    getCurrentUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { avatarUpload } from "../middlewares/multer.middleware.js";

const router = Router();

// *** Routes ***
router.route("/register").post(avatarUpload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/update-avatar").patch(
    verifyJWT,
    avatarUpload.single("avatar"),
    updateUserAvatar
);
router.route("/students").get(verifyJWT, getAllStudents);
router.route("/teachers").get(verifyJWT, getAllTeachers);
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
