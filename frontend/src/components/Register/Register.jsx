import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";

const Register = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState(null)

    const [avatarPreview, setAvatarPreview] = useState(null);
    const navigate = useNavigate();

    const handleAvatarChange = (event) => {
        setError("");
        // errors.avatar = null; 
        const file = event.target.files[0]; 
        if (file && file.type.substr(0, 5) === "image") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result); 
            };
            reader.readAsDataURL(file);
            // setValue("avatar", file);
            setAvatar(file)
        }
        else{
            setAvatarPreview(null);
            // setValue("avatar", null);
            setAvatar(null)
            setError("Invalid Image")
        }
    };

    const registerUser = async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("avatar", avatar); // Access avatar directly
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role", data.role);
        formData.append("dept", data.dept);
        // console.log("he he hu hu")
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}api/v1/users/register`,
                formData
            );
            // console.log(response.data);
            setIsLoading(false);
            navigate("/lr/login");
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };
    if(isLoading) return (
        <Loading />
    )
    return (
        <div className="flex w-[25vw] flex-col items-center justify-around rounded-lg bg-shade4 py-6">
            <h3 className="text-2xl font-bold">Register User</h3>
            <form
                onSubmit={handleSubmit(registerUser)}
                className="flex flex-col items-center"
            >
                <label
                    htmlFor="avatar"
                    className="m-4 flex cursor-pointer flex-col items-center text-shade7"
                >
                    <span className="text-xs">Upload Avatar</span>
                    {avatarPreview ? (
                        <img
                            className="h-[7vw] w-[7vw] rounded-full object-cover"
                            src={avatarPreview}
                            alt="Avatar Preview"
                        />
                    ) : (
                        <svg
                            className="h-[5vw] w-[5vw] "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM13 12V16H11V12H8L12 8L16 12H13Z"></path>
                        </svg>
                    )}
                </label>

                <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    onChange={handleAvatarChange}
                    id="avatar"
                    className="hidden"
                />

                {errors.avatar && (
                    <div className="text-sm text-red-600">
                        {errors.avatar.message}
                    </div>
                )}

                <input
                    className="mb-4 h-10 w-full rounded-lg border-2 border-shade4 px-2 text-shade9 focus:outline-none"
                    placeholder="Full Name"
                    {...register("fullName", {
                        required: "Full Name is required",
                        maxLength: 40,
                    })}
                />
                {errors.fullName && (
                    <div className="text-sm text-red-600">
                        {errors.fullName.message}
                    </div>
                )}

                <input
                    className="mb-4 h-10 w-full rounded-lg border-2 border-shade4 px-2 text-shade9 focus:outline-none"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                        maxLength: 40,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && (
                    <div className="text-sm text-red-600">
                        {errors.email.message}
                    </div>
                )}

                <input
                    className="mb-4 h-10 w-full rounded-lg border-2 border-shade4 px-2 text-shade9 focus:outline-none"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Password must have at least 5 characters",
                        },
                    })}
                />
                {errors.password && (
                    <div className="text-sm text-red-600">
                        {errors.password.message}
                    </div>
                )}

                <div className="flex gap-2 text-shade6">
                    <div>
                        <select
                            className="mb-4 h-9 w-full rounded-lg border-2 border-shade4 px-2 text-shade9 focus:outline-none"
                            id="role"
                            {...register("role", {
                                required: "Role is required",
                            })}
                        >
                            <option value="">Role</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <div>
                        <select
                            className="mb-4 h-9 w-full rounded-lg border-2 border-shade4 px-2 text-shade9 focus:outline-none"
                            id="dept"
                            {...register("dept", {
                                required: "Department is required",
                            })}
                        >
                            <option value="">Department</option>
                            <option value="CSE">CSE</option>
                            <option value="AIML">AIML</option>
                            <option value="IT">IT</option>
                            <option value="CCE">CCE</option>
                            <option value="IOT">IOT</option>
                        </select>
                    </div>
                </div>
                {errors.role && (
                    <div className="text-sm text-red-600">
                        {errors.role.message}
                    </div>
                )}
                {errors.dept && (
                    <div className="text-sm text-red-600">
                        {errors.dept.message}
                    </div>
                )}
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                    type="submit"
                    className="border-1 mt-4 rounded-lg bg-shade6 px-4 py-2 font-bold text-shade1 transition-all duration-300 ease-in-out hover:bg-shade7"
                >
                    Register
                </button>
            </form>

            <div className="flex gap-2 pt-2 text-sm">
                <p>Already have an account </p>
                <Link to="/lr/login">
                    <span className="text-blue-500">Login</span>
                </Link>
            </div>
        </div>
    );
};

export default Register;
