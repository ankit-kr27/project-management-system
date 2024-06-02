import React from "react";
import { useSelector } from "react-redux";
import { userProjects } from "../../data/userProjects";

const RightDock = () => {
    const project = useSelector((state) => state.project.project);
    console.log(project)
    return (
        <div className="flex h-[80vh] w-fit max-w-[15vw] flex-col gap-4 rounded-2xl bg-shade8 p-6 text-shade1">
            
        </div>
    );
};

export default RightDock;
