import React, { useState } from 'react';
import './LoginPage.css';
import LoginForm from './LoginForm';

const LoginPage = ({ onLogin }) => {


    return (
        <div className='login-page'>
            <div className='login-container1'></div>
            <div className='login-container2'>
                <div className='product-info'>
                    <p className='company-name'>SportSea</p>
                    <p className='welcome-text'>Welcome, please sign in to continue</p>
                </div>
                <div className='login-form-conatiner'>
                    <LoginForm onLogin={onLogin} />
                </div>

            </div>

        </div>
    );
};

export default LoginPage;
