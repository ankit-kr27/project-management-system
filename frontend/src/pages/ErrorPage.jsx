import React from "react";
import { NavLink } from "react-router-dom";

function ErrorPage() {
    return (
        <div className="h-[100vh] m-auto">
            <div>404 Not Found</div>
            <NavLink to="/">Go to Home</NavLink>
        </div>
    );
}

export default ErrorPage;
