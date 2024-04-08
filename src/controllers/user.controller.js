import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating access and refresh tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, role } = req.body;

    if (
        [fullName, email, password, role].some((field) => {
            if (field?.trim() === "") {
                throw new ApiError(400, `${field} is required`);
            }
        })
    );

    if (!["teacher", "student"].includes(role)) {
        throw new ApiError(400, "Role must be either teacher or student");
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(500, "Error uploading avatar");
    }

    const user = new User({
        fullName,
        email,
        password,
        role,
        avatar: avatar?.secure_url,
    });

    await user.save();

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Error creating user");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User registered successfully")
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});

const logOutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 },
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(400, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "refresh token is expired or invalid");
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new ApiError(500, error?.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(req.user?._id);

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
        throw new ApiError(400, "Incorrect password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "Current user fetched successfully")
        );
});

const updateAccountDetails = asyncHandler(async (req, res)=>{
    const {fullName, email} = req.body;     // we are only allowing email and fullName to be updated and not username.
    // We'll write separate controllers for updating coverImage and avatar
    if(!(email || fullName)){
        throw new ApiError(400, "All fields are required");
    }

    if(email){
        const existingEmail = await User.findOne({
            email: email
        })
        if(existingEmail){
            throw new ApiError(400, "Email is already being used")
        }
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullName: fullName,
                email: email || req.user?.email
                // updating the values both ways
            }
        },
        {new: true} // return the new updated user
    ).select("-password -refreshToken")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Account details updated successfully")
    )
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    const user = await User.findById(req.user?._id).select(
        "-password -refreshToken"
    );
    const oldAvatarUrl = user?.avatar;

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading avatar");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url,
            },
        },
        { new: true }
    ).select("-password -refreshToken");

    const response = await deleteFromCloudinary(oldAvatarUrl);

    if (!response) {
        throw new ApiError(500, "Error deleting avatar from cloudinary");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Avatar updated successfully"));
});

export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
    updateUserAvatar,
};
