import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authslice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accessToken = useSelector((state) => state.auth.accessToken);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    const logoutHandler = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}api/v1/users/logout`,
                null,
                {
                    Headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data);
            if (response.data.success) {
                dispatch(logout(response.data));
                navigate("/lr/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-shade4 absolute -right-11 top-12 flex flex-col gap-2 rounded-lg p-[1vw]">
            <Link
                to="/lr/login"
                className="text-shade9 hover:bg-shade3 text-md rounded-lg px-2 py-1 font-semibold transition-all duration-300 ease-in-out"
            >
                Login
            </Link>
            <Link
                to="/lr/register"
                className="text-shade9 hover:bg-shade3 text-md rounded-lg px-2 py-1 font-semibold transition-all duration-300 ease-in-out"
            >
                Register
            </Link>
            <div
                className="text-shade9 hover:bg-shade3 text-md flex cursor-pointer gap-2 rounded-lg px-2 py-1 font-semibold transition-all duration-300 ease-in-out"
                onClick={logoutHandler}
            >
                {isAuthenticated && <p>Logout</p>}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="my-auto h-4 w-4"
                >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default ProfileCard;
