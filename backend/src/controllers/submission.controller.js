import { asyncHandler } from "../utils/asyncHandler.js";
import { Submission } from "../models/submission.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/project.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const createSubmission = asyncHandler(async (req, res) => {
    const { projectId, stage } = req.params;
    const fileName = req.file.originalname;
    const filePath = req.file.path;
    const userId = req.user._id;
    const workingDescription = req.body.workingDescription;

    if(!fileName || !filePath) {
        throw new ApiError(400, "Please provide a file");
    }

    Project.findById(projectId)
        .populate({
            path: "submissions",
        })
        .exec((err, project) => {
            if (err || !project) {
                throw new ApiError(404, "Project not found");
            }

            if(project.students.includes(userId) === false) {
                throw new ApiError(400, "You are not a part of this project");
            }

            if(project.isApproved === false) {
                throw new ApiError(400, "You can make submission only for approved projects");
            }

            if (project.submissions.length === 2) {
                throw new ApiError(400, "All submissions are already done");
            }

            if (project.deadline1 < Date.now() && stage === "stage1") {
                throw new ApiError(400, "Stage 1 deadline has passed");
            }

            if (project.deadline2 < Date.now() && stage === "stage2") {
                throw new ApiError(400, "Stage 2 deadline has passed");
            }
        })
        .then(() => {
            const submission = new Submission({
                files: {fileName, filePath},
                student: userId,
                workingDescription,
                project: projectId,
                stage,
            });

            submission.save((err) => {
                if (err) {
                    throw new ApiError(400, "Submission failed");
                }
        });

        res
        .status(201)
        .json(
            new ApiResponse(201, submission, "Submission created")
        );
    });
});

const evaluateSubmission = asyncHandler(async (req, res) => {
    const { submissionId } = req.params;
    const { criteria, feedback } = req.body;
    const evaluatorId = req.user._id;

    const submission = await Submission.findById(submissionId);

    const user = await User.findById(evaluatorId);

    if(user.role !== "teacher") {
        throw new ApiError(400, "Only a teacher can evaluate a submission");
    }

    if(!submission) {
        throw new ApiError(404, "Submission not found");
    }

    if(submission.evaluation) {
        throw new ApiError(400, "Submission already evaluated");
    }

});

const downloadSubmission = asyncHandler(async (req, res) => {

});

export { createSubmission, evaluateSubmission, downloadSubmission };
