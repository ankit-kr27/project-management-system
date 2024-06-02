import React from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const Navbar = () => {
    return (
        <nav className="flex h-[6rem] items-center justify-between px-[10vw]">
            <div>
                <Link to="/">
                    <h1 className="text-3xl font-bold text-shade9">NeXus/</h1>
                </Link>
            </div>
            <ProfileMenu />
        </nav>
    );
};

export default Navbar;
