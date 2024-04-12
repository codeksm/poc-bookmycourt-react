import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import './LoginForm.css';
import LoginService from '../service/LoginService';
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        setLoading(true);

        const requestBody = {
            username: values.email,
            password: values.password
        };

        console.log(JSON.stringify(requestBody));
        LoginService.authenticate(requestBody)
            .then((response) => {
                // Store the token in local storage
                localStorage.setItem("authResponse", JSON.stringify(response.data));
                console.log(JSON.stringify(response.data));
                // Modal.success({
                //     title: 'Booking Success!',
                //     content: (
                //         <div>

                //             <div>Login Successfull!</div>

                //         </div>
                //     ),
                // });
                onLogin(true);
                navigate("/playground")
            })
            .catch((error) => {
                console.log("Failed to login. " + error)
                Modal.error({
                    title: 'Failed to Login',
                    content: (
                        <div>
                            {/* Display the error message */}
                            {error.message}
                        </div>
                    ),
                });
            }).finally(() => {
                setLoading(false);
            });

    };

    return (
        <div className='login-container'>

            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
            >
                <Form.Item
                    name="email"
                    className="login-email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input className="login-email-input" placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    className="login-password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password className="login-password-input" placeholder="Password" />
                </Form.Item>

                <Form.Item className="login-submit">
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
