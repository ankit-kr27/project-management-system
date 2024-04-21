import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/store.js'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Homepage from './pages/Homepage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import AuthLayout from './components/AuthLayout/AuthLayout'
import LoginRegisterPage from './pages/LoginRegisterPage.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/:userId",
                element: (
                    <AuthLayout authentication={true}>
                        <Homepage />
                    </AuthLayout>
                ),
            },
            {
                path: "/lr",
                element: (
                    <AuthLayout authentication={false}>
                        <LoginRegisterPage />
                    </AuthLayout>
                ),
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: "/lr/login",
                        element: <Login />,
                    },
                    {
                        path: "/lr/register",
                        element: <Register />,
                    }
                ],
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
    // </React.StrictMode>,
);
