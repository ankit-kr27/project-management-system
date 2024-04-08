import multer from "multer";

// Multer configuration for avatars
const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/temp"); // Destination folder for avatars
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const avatarUpload = multer({
    storage: avatarStorage,
});

// Multer configuration for ZIP file uploads
const zipStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads"); // Destination folder for ZIP files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const zipUpload = multer({
    storage: zipStorage,
});
