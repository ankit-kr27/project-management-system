import mongoose, { Schema } from "mongoose";

const evaluationSchema = new Schema(
    {
        submission: {
            type: Schema.Types.ObjectId,
            ref: "Submission",
            required: true,
        },
        criteria: {
            scopeOrCreative: { type: Number, default: 0, min: 1, max: 10 },
            managementAndPlanning: {
                type: Number,
                default: 0,
                min: 1,
                max: 10,
            },
            documentation: { type: Number, default: 0, min: 1, max: 10 },
            execution: { type: Number, default: 0, min: 1, max: 10 },
            presentation: { type: Number, default: 0, min: 1, max: 10 },
        },
        feedback: { type: String },
    },
    { timestamps: true }
);

export const Evaluation = mongoose.model("Evaluation", evaluationSchema);
