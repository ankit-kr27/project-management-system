import mongoose, { Schema } from "mongoose";

const githubIntegrationSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        githubAccessToken: { type: String, required: true },
        githubUsername: { type: String, required: true },
        githubUserId: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const GithubIntegration = mongoose.model(
    "GithubIntegration",
    githubIntegrationSchema
);
