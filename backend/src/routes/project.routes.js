import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createProject,
    getProjectById,
    getUserProjects,
    updateProject,
    deleteProject,
    getProjectRequest,
    approveProject,
} from "../controllers/project.controller.js";

const router = Router();

router.use(verifyJWT)

// *** Routes ***
router.route("/create").post(createProject);
router.route("/user-projects").get(getUserProjects);
router.route("/requests").get(getProjectRequest);
router
    .route("/p/:projectId")
    .get(getProjectById)
    .patch(updateProject)
    .delete(deleteProject);
router.route("/approve/:projectId").patch(approveProject);
router.route("/reject/:projectId")

export default router;