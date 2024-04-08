import mongoose, {Schema} from "mongoose";

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
        status: {
            type: String,
            enum: ["pending", "in-progress", "evaluated"],
            default: "pending",
        },
        deadline: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);