import mongoose, {Schema} from "mongoose";

const submissionSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        status: {
            type: String,
            enum: ["stage1", "stage2"],
            default: "stage1",
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
    },
    { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);