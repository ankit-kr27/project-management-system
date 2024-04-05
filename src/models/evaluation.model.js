import mongoose, { Schema } from "mongoose";

const evaluationSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        evaluation: {
            stage1: {
                scopeOrCreative: { type: Number, default: 0 },
                managementAndPlanning: { type: Number, default: 0 },
                documentation: { type: Number, default: 0 },
                feedback: { type: String },
            },
            stage2: {
                execution: { type: Number, default: 0 },
                presentation: { type: Number, default: 0 },
                feedback: { type: String },
            },
        },
        feedback: { type: String },
    },
    { timestamps: true }
);

const Evaluation = mongoose.model("Evaluation", evaluationSchema);