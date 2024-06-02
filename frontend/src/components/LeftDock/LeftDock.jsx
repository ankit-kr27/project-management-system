import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProject } from "../../store/projectSlice";

const LeftDock = ({ projects }) => {
    const dispatch = useDispatch();
    return (
        <div className="w-fit max-w-[15vw] bg-shade8 h-[80vh] rounded-2xl text-shade1 p-6 flex flex-col gap-4">
            {projects.map((project) => (
                <Link key={project._id} to={`/project/${project._id}`}
                    onClick={() => {dispatch(getProject(project))}}
                >
                    <p className="text-center p-1 rounded-lg hover:bg-shade9 focus:bg-shade-9">
                        {project.title}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default LeftDock;
