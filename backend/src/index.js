// Entry point of the application

import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: "./.env",
});

connectDB()
.then(() => {
    app.on("error", error=>{
        console.log("ERR: ", error);
        throw error;
    })
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch(error=>{
    console.log("ERROR!!MongoDB connection failed!", err);
})
