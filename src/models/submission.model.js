import mongoose, {Schema} from "mongoose";

const submissionSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
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
        }
    },
    { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);