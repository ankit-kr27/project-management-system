import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { getProjects } from "../store/projectSlice";
import {userProjects} from "../data/userProjects.js";
import LeftDock from "../components/LeftDock/LeftDock.jsx";
import RightDock from "../components/RightDock/RightDock.jsx";

const Homepage = () => {
    const [projects, setProjects] = useState(userProjects);
    // const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProjects = async () => {
            dispatch(getProjects(userProjects));
            setProjects(userProjects);
        };
        fetchProjects();
    }, [dispatch]);

    return (
        <div className="px-[5vw] flex justify-between">
            <LeftDock projects={projects} />
            <div>
                <Outlet />
            </div>
            <RightDock />
        </div>
    );
};

export default Homepage;
