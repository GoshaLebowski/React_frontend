import React from 'react';
import Greeting from "./Greeting";

const LoginPage = () => {
    const name = "Gosha"
    return (
        <div>
            <h1>Login page</h1>
            <Greeting name={name}/>
        </div>
    );
};

export default LoginPage;