import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./store/authslice";

function App() {
    // useEffect(() => {
    //     const getUser = async () => {
    //         const response = await axios.get(
    //             `${import.meta.env.VITE_BACKEND_URL}api/v1/users/current-user`
    //         );
    //         console.log(response.data);
    //     };
    //     getUser();
    // }, []);

    return (
        <div className="text-shade9 h-screen bg-white font-sans">
            <Navbar />
            <main className="h-[calc(100vh-6rem)]">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
