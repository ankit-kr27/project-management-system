import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Lottie from "react-lottie";
import animaiton from "../public/lotties/Animation - 1713635685590.json";

function App() {
    return (
        <div className="text-shade9 h-screen bg-white px-[10vw] font-sans">
            <Navbar />
            <main className="h-[calc(100vh-6rem)]">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
