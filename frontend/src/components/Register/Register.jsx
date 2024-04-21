import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [avatarPreview, setAvatarPreview] = useState(null);
    const navigate = useNavigate();

    const handleAvatarChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        // Preview the selected image file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result); // Set the preview image URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const registerUser = async (data) => {
        const formData = new FormData();
        formData.append("avatar", data.avatar[0]);
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role", data.role);
        formData.append("dept", data.dept);

        try {
            const response = await axios.post(
                `${import.meta.env.BACKEND_URL}/v1/users/register`,
                formData
            );
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(registerUser)}>
                <input
                    accept="image/*"
                    type="file"
                    {...register("avatar", {
                        required: "Avatar is required",
                    })}
                    onChange={handleAvatarChange}
                />
                {avatarPreview && (
                    <img src={avatarPreview} alt="Avatar Preview" />
                )}
                {errors.avatar && <div>{errors.avatar.message}</div>}

                <input
                    placeholder="Full Name"
                    {...register("fullName", {
                        required: "Full Name is required",
                        maxLength: 40,
                    })}
                />
                {errors.fullName && <div>{errors.fullName.message}</div>}

                <input
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
                {errors.email && <div>{errors.email.message}</div>}

                <input
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
                {errors.password && <div>{errors.password.message}</div>}

                <div>
                    <label htmlFor="role">Role: </label>
                    <select
                        id="role"
                        {...register("role", {
                            required: "Role is required",
                        })}
                    >
                        <option value="">Select Role</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                {errors.role && <div>{errors.role.message}</div>}

                <div>
                    <label htmlFor="dept">Department: </label>
                    <select
                        id="dept"
                        {...register("dept", {
                            required: "Department is required",
                        })}
                    >
                        <option value="">Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="AIML">AIML</option>
                        <option value="IT">IT</option>
                        <option value="CCE">CCE</option>
                        <option value="IOT">IOT</option>
                    </select>
                </div>
                {errors.dept && <div>{errors.dept.message}</div>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
