import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../store/authslice";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const loginUser = async (data) => {
        setError("");   // Clear the error message
        console.log(data);
        try{
            const response = await axios.post(
                `http://localhost:8000/api/v1/users/login`,
                data
            );
            console.log(response.data);
            if(response.data.success){
                dispatch(login(response.data));
                navigate("/");
            }
        }catch(err){
            console.log(err);
            setError(err.response.data.message);
        }
    };

    return (
        <div className="bg-shade4 flex h-[25vw] w-[25vw] flex-col items-center justify-around rounded-lg">
            <h3 className="text-2xl font-bold">Log In</h3>
            <form
                onSubmit={handleSubmit(loginUser)}
                className="flex flex-col items-center"
            >
                <input
                    className="text-shade9 border-shade4 mb-4 h-10 w-full rounded-lg border-2 px-2 focus:outline-none"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    className="text-shade9 border-shade4 mb-4 h-10 w-full rounded-lg border-2 px-2 focus:outline-none"
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
                {errors.password && <p>{errors.password.message}</p>}
                {error && <p>{error}</p>}
                <button
                    type="submit"
                    className="border-1 hover:bg-shade7 bg-shade6 text-shade1 mt-4 rounded-lg px-4 py-2 font-bold transition-all duration-300 ease-in-out"
                >
                    Login
                </button>
            </form>
            <div className="flex gap-2">
                <p>Don&apos;t have an account </p>
                <Link to="/lr/register">
                    <span className="text-blue-500">Register</span>
                </Link>
            </div>
        </div>
    );
};

export default Login;
