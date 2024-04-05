import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        fs.unlink(localFilePath); 
        return null;
    }
};

const deleteFromCloudinary = async (url, resourceType) => {
    try {
        // http://res.cloudinary.com/dvyovlngn/image/upload/v1707507668/n8ap7ojlaobu50h4vy8j.png

        const publicId = url.split("/").pop().split(".")[0];

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };