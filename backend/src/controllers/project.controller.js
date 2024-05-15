import { asyncHandler } from "../utils/asyncHandler.js";
import { Project } from "../models/project.model.js";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const createProject = asyncHandler(async (req, res) => {
    if (req.user?.role === "teacher") {
        throw new ApiError(403, "Only students can create projects");
    }

    const { title, description, teacher, student } = req.body;

    if (
        [title, description, teacher].some((field) => {
            if (field?.trim() === "") {
                throw new ApiError(400, ` all fields are required`);
            }
        })
    );

    if (!isValidObjectId(teacher)) {
        throw new ApiError(400, "Invalid teacher ID");
    }

    const teacherExists = await User.exists({
        $and: [{ _id: teacher }, { role: "teacher" }],
    });

    if (!teacherExists) {
        throw new ApiError(404, "Teacher not found");
    }

    const students = [req.user._id];

    if (student && student.toString() !== req.user._id.toString()) {
        if (!isValidObjectId(student)) {
            throw new ApiError(400, "Invalid student ID");
        }

        const studentExists = await User.exists({
            $and: [{ _id: student }, { role: "student" }],
        });

        if (!studentExists) {
            throw new ApiError(404, "Student not found");
        }

        students.push(student);
    }

    const project = new Project({
        title: title || "Untitled Project",
        description: description || "No description provided",
        teacher,
        students,
        admin: req.user._id,
    });

    // when we add the teacher, a request will be made to the teacher to approve the project
    // if he rejects it, can edit the the teacher field and add another teacher

    await project.save({ validateBeforeSave: false });

    const createdProject = await Project.findById(project._id).populate({
        path: "teacher students admin",
        select: "role fullName email dept avatar",
    });

    res.status(201).json(
        new ApiResponse(201, createdProject, "Project created successfully")
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
        path: "teacher students admin",
        select: "role fullName email dept avatar",
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

    const projects = await Project.find({
        $or: [{ students: userId }, { teacher: userId }],
    }).populate({
        path: "teacher students admin",
        select: "role fullName email dept avatar",
    });

    return res
        .status(200)
        .json(new ApiResponse(200, projects, "Projects fetched successfully!"));
});

const getProjectRequest = asyncHandler(async (req, res) => {
    // Only the teacher can view all project requests under him
    if (req.user?.role !== "teacher") {
        throw new ApiError(
            403,
            "Only teachers can view all project requests under them"
        );
    }

    const projects = await Project.find({
        teacher: req.user._id,
        isApproved: false,
    }).populate({
        path: "teacher students admin",
        select: "role fullName email dept avatar",
    });

    return res
        .status(200)
        .json(new ApiResponse(200, projects, "Projects fetched successfully!"));
});

const approveProject = asyncHandler(async (req, res) => {
    // Only the teacher can approve a project
    const { deadline1, deadline2 } = req.body;

    if (req.user?.role !== "teacher") {
        throw new ApiError(403, "Only teachers can approve a project");
    }

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
        throw new ApiError(
            403,
            "You are not authorized to approve this project"
        );
    }

    const approvedProject = await Project.findByIdAndUpdate(
        { _id: projectId },
        {
            isApproved: true,
            deadline1,
            deadline2,
        },
        { new: true }
    ).populate({
        path: "teacher students admin",
        select: "role fullName email dept avatar",
    });

    return res
        .status(200)
        .json(new ApiResponse(200, approvedProject, "Project approved successfully"));
});

const updateProject = asyncHandler(async (req, res) => {
    // Only admin updates: students, teacher
    // both students can update: title, description
    // title of the project cannot be updated after approval

    const { projectId } = req.params;

    if(!projectId){
        throw new ApiError(400, "Missing project id");
    }

    if(!isValidObjectId(projectId)){
        throw new ApiError(400, "Invalid project id");
    }

    const project = await Project.findById(projectId);

    if(!project){
        throw new ApiError(404, "Project not found")
    }
// *****************************************************

    const requestingUser = User.findById(req.user._id);

    if(!requestingUser){
        throw new ApiError(404, "User not found");
    }

    if(requestingUser.role === "teacher"){
        const { deadline1, deadline2 } = req.body;

        if(project.teacher.toString() !== req.user._id.toString()){
            throw new ApiError(403, "You are not authorized to update this project");
        }

        if(deadline1) project.deadline1 = deadline1;
        if(deadline2) project.deadline2 = deadline2;
    }else{
        const { title, description, teacher, student } = req.body;

        if(teacher){
            if(project.isApproved){
                throw new ApiError(403, "You can't update the teacher of an approved project");
            }
            if(project.admin.toString() !== req.user?._id.toString()){
                throw new ApiError(403, "You are not authorized to update the teacher of this project");
            }
            if(!isValidObjectId(teacher)){
                throw new ApiError(400, "Invalid teacher id");
            }
            const teacherExists = await User.exists({
                $and: [{ _id: teacher }, { role: "teacher" }],
            });
            if(!teacherExists){
                throw new ApiError(404, "Teacher not found");
            }
            project.teacher = teacher;
            project.isApproved = false;
        }

        if(student){
            if(project.isApproved){
                throw new ApiError(403, "You can't update the student of an approved project");
            }
            if(project.admin.toString() !== req.user?._id.toString()){
                throw new ApiError(403, "You are not authorized to update the student of this project");
            }
            if(!isValidObjectId(student)){
                throw new ApiError(400, "Invalid student id");
            }
            const studentExists = await User.exists({
                $and: [{ _id: student }, { role: "student" }],
            });
            if(!studentExists){
                throw new ApiError(404, "Student not found");
            }
            if(project.students.includes(student)){
                throw new ApiError(400, "Student already in the project");
            }
            project.students = [project.admin, student];
        }

        if(title && project.isApproved){
            throw new ApiError(403, "You can't update the title of an approved project");
        }
        if(title) project.title = title;

        if(description) project.description = description;

        project.validate({
            fields: ["title", "description", "teacher", "students"],
        });

        await project.save({ validateBeforeSave: false });

        const updatedProject = await Project.findById(projectId).populate({
            path: "teacher students admin",
            select: "role fullName email dept avatar",
        });

        if(!updatedProject){
            throw new ApiError(500, "Error updating project");
        }
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProject, "Project updated successfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
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

    if (project.admin.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to delete this project"
        );
    }

    await Project.findByIdAndDelete(projectId);

    const response = await Project.findById(projectId);

    if (response) {
        throw new ApiError(500, "Error deleting the project");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Project deleted successfully"));
});

export {
    createProject,
    getProjectById,
    getUserProjects,
    updateProject,
    deleteProject,
    getProjectRequest,
    approveProject,
};