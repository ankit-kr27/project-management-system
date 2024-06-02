import { asyncHandler } from "../utils/asyncHandler.js";
import { Submission } from "../models/submission.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/project.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const createSubmission = asyncHandler(async (req, res) => {
    const {projectId, stage} = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if(project.students.indexOf(req.user._id) === -1) {
        throw new ApiError(403, "You are not a student of this project");
    }

    const user = await User.findById(req.user._id);
    

});

const evaluateSubmission = asyncHandler(async (req, res) => {
    

});

const downloadSubmission = asyncHandler(async (req, res) => {

});

export { createSubmission, evaluateSubmission, downloadSubmission };
