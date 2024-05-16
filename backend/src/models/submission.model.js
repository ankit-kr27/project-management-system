import mongoose, {Schema} from "mongoose";

const submissionSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        workingDescription: {
            type: String,
            required: true,
            trim: true,
        },
        stage: {
            type: String,
            enum: ["stage1", "stage2"],
            default: "stage1",
        },
        deadline:{
            type: Date,
            required: true,
        },
        files: [
            {
                fileName: {
                    type: String,
                    required: true,
                    trim: true,
                },
                filePath: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
        ],
        isEvauated: {
            type: Boolean,
            default: false,
        },
        evaluation: {
            type: Schema.Types.ObjectId,
            ref: "Evaluation"
        }
    },
    { timestamps: true }
);

export const Submission = mongoose.model("Submission", submissionSchema);