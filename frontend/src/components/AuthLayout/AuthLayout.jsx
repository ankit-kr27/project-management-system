import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// AuthLayout component
// This component is used to check if the user is authenticated or not and then render the children components accordingly 
// Higher order component to check if the user is authenticated or not 

const AuthLayout = ({ children, authentication = true }) => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if(authentication && !isAuthenticated){
            navigate('/lr/login')
        } else if(!authentication && isAuthenticated){  // If the user is authenticated and the authentication is false then navigate to the home page
            // for example if the user hits /login and he is already logged in, then go to homepage
            navigate('/')
        }
        setLoader(false);
    }, [isAuthenticated, navigate, authentication]);
// if the user is authenticated and the authetication is true then render the children components else show the loading message
    return loader ? <div></div> : <>{children}</>;
};

export default AuthLayout;
