import { asyncHandler } from "../utils/asyncHandler.js";
import {Submission} from "../models/submission.model.js";

const createSubmission = asyncHandler(async (req, res) => {
    const fileName = req.file.originalname;
    const filePath = req.file.path;
    // Extract the user ID
    const userId = req.user._id;
    // Create a new submission
    const submission = new Submission({
        fileName,
        filePath,
        userId,
    });
    // Save the submission
    await submission.save();
    // Send a response
    res.status(201).json({ message: "Submission created" });
});

const getSubmissions = asyncHandler(async (req, res) => {
    
    
});

export { createSubmission, getSubmissions };