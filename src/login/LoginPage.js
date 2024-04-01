import React, { useState } from 'react';
import './LoginPage.css';
import LoginForm from './LoginForm';

const LoginPage = ({ onLogin }) => {


    return (
        <div className='login-page'>
            <LoginForm onLogin={onLogin} />
        </div>
    );
};

export default LoginPage;
