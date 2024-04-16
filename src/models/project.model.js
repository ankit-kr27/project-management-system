import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                validate: [
                    (v) => v.length <= 2,
                    "{PATH} exceeds the limit of 2",
                ],
            },
        ],
        admin: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        deadline1: {
            type: Date,
            required: true,
        },
        deadline2: {
            type: Date,
            required: true,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
