import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userProjects } from "../../data/userProjects";

const Project = () => {
    const { projectId } = useParams();
    const project = userProjects.find((project) => project._id.toString() === projectId.toString());
    return (
    <div className="mx-10">
        <h1 className="font-bold text-[3vw] mt-6">{project.title}</h1>
        <h2 className="font-semibold text-2xl mt-6">Description</h2>
        <p className="pl-4 font-normal text-l">{project.description}</p>
    </div>);
};

export default Project;
