import React, { useState } from 'react';
import './LoginPage.css';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

const LogOut = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authResponse");
        setIsLoggedIn(false)
        navigate("/")
    };

    return (
        <div className='logout-page'>
            <Button onClick={handleLogout}> LogOut</Button>
        </div>
    );
};

export default LogOut;
