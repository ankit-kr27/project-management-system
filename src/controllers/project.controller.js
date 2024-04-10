import { asyncHandler } from "../utils/asyncHandler.js";
import { Project } from "../models/project.model.js";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProject = asyncHandler(async (req, res) => {
    if (req.user?.role === "teacher") {
        throw new ApiError(403, "Only students can create projects");
    }

    const { title, description, teacher, students } = req.body;

    if (
        [title, description, teacher].some((field) => {
            if (field?.trim() === "") {
                throw new ApiError(400, `${field} is required`);
            }
        })
    );

    students.push(req.user);

    const project = new Project({
        title,
        description,
        teacher,
        students,
    });

    // when we add the teacher, a request will be made to the teacher to approve the project
    // if he rejects it, can edit the the teacher field and add another teacher

    await project.save();

    res.status(201).json(
        new ApiResponse(201, project, "Project created successfully")
    );
});

const getProjectById = asyncHandler(async (req, res) => {
    //  only the teacher and students of the project can view the project
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Project ID is required");
    }

    if (!isValidObjectId(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }

    const project = await Project.findById(projectId).populate({
        path: "teacher students",
        select: "-password -refreshToken",
    });

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (
        project.students.every(
            // Throw error if every student in the project is not the current user. and the current user is not the teacher
            (student) => student._id.toString() !== req.user._id.toString()
        ) &&
        req.user?._id.toString() !== project.teacher._id.toString()
    ) {
        throw new ApiError(403, "You are not authorized to view this project");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project fetched successfully!"));
});

const getUserProjects = asyncHandler(async (req, res) => {
    // only the student can see their all projects
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const projects = await Project.find({ students: userId }).populate({
        path: "teacher students",
        select: "-password -refreshToken",
    });

    if (!projects) {
        throw new ApiError(404, "Projects not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, projects, "Projects fetched successfully!"));
});

const updateProject = asyncHandler(async (req, res) => {
    // ByStudents
    // Only the student who are in students created the project can update the project
    // can update title only before the project is approved and description anytime
    // can update the teacher only if the project is not approved
    // can update the students only if the project is not approved
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Project ID is required");
    }

    if (!isValidObjectId(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (
        project.students.every(
            (student) => student._id.toString() !== req.user._id.toString()
        )
    ) {
        throw new ApiError(
            403,
            "You are not authorized to update this project"
        );
    }

    const { title, description, teacher, students } = req.body;

    if (title && project.isApproved) {
        throw new ApiError(
            403,
            "You can't update the title of an approved project"
        );
    }
    if (teacher && project.isApproved) {
        throw new ApiError(
            403,
            "You can't update the teacher of an approved project"
        );
    }
    if (students && project.isApproved) {
        throw new ApiError(
            403,
            "You can't update the students of an approved project"
        );
    }

    if (title) project.title = title;
    if (description) project.description = description;
    if (teacher) project.teacher = teacher;
    if (students) project.students = students;

    await project.save();

    const updatedProject = await Project.findById(projectId).populate({
        path: "teacher students",
        select: "-password -refreshToken",
    });

    if (!updatedProject) {
        throw new ApiError(500, "Error updating project");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedProject, "Project updated successfully")
        );
});

const deleteProject = asyncHandler(async (req, res) => {
    // Only students who created the project can delete the project
    // can delete the project only if it is not approved

    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Project ID is required");
    }

    if (!isValidObjectId(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (project.isApproved) {
        throw new ApiError(403, "You can't delete an approved project");
    }

    if(req.user?.role === "teacher"){
        throw new ApiError(403, "Only students can delete projects");
    }

    if (
        project.students.every(
            (student) => student._id.toString() !== req.user._id.toString()
        )
    ) {
        throw new ApiError(
            403,
            "You are not authorized to delete this project"
        );
    }

    await project.delete();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Project deleted successfully"));
});

const getAllProjectsUnderTeacher = asyncHandler(async (req, res) => {
    // Only the teacher can view all projects under him
    if (req.user?.role !== "teacher") {
        throw new ApiError(403, "Only teachers can view all projects under them");
    }

    const projects = await Project.find({ teacher: req.user._id }).populate({
        path: "teacher students",
        select: "-password -refreshToken",
    });

    if (!projects) {
        throw new ApiError(404, "Projects not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, projects, "Projects fetched successfully!")
        );
});

const getProjectRequest = asyncHandler(async (req, res) => {
    // Only the teacher can view all project requests under him
    if (req.user?.role !== "teacher") {
        throw new ApiError(403, "Only teachers can view all project requests under them");
    }

    const projects = await Project.find({ teacher: req.user._id, isApproved: false }).populate({
        path: "teacher students",
        select: "-password -refreshToken",
    });

    if (!projects) {
        throw new ApiError(404, "Projects not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, projects, "Projects fetched successfully!")
        );
});

const approveProject = asyncHandler(async (req, res) => {
    // Only the teacher can approve a project
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Project ID is required");
    }

    if (!isValidObjectId(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (req.user?._id.toString() !== project.teacher._id.toString()) {
        throw new ApiError(403, "You are not authorized to approve this project");
    }

    project.isApproved = true;

    await project.save();

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project approved successfully"));
});

export {
    createProject,
    getProjectById,
    getUserProjects,
    updateProject,
    deleteProject,
    getAllProjectsUnderTeacher,
    getProjectRequest,
    approveProject,
};
