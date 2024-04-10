import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createProject,
    getProjectById,
    getUserProjects,
    updateProject,
    deleteProject,
    getAllProjectsUnderTeacher,
    getProjectRequest,
    approveProject,
} from "../controllers/project.controller.js";

const router = Router();

router.use(verifyJWT)

// *** Routes ***
router.route("/create").post(createProject);
router.route("/t").get(getAllProjectsUnderTeacher);
router
    .route("/:projectId")
    .get(getProjectById)
    .patch(updateProject)
    .delete(deleteProject);
router.route("/s").get(getUserProjects);
router.route("/requests").get(getProjectRequest);
router.route("/approve/:projectId").patch(approveProject);

export default router;