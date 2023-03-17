import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [usernameEntered, setUsernameEntered] = useState("");
    const [passwordEntered, setPasswordEntered] = useState("");
    const usernameHandler = (event) => {
        setUsernameEntered(event.target.value);
    }
    const passwordHandler = (event) => {
        setPasswordEntered(event.target.value);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        if (
            passwordEntered.trim().length === 0 ||
            usernameEntered.trim().length === 0
        ) {
            // props.onError(true);
            return null;
        }
        const userData = {
            username: usernameEntered,
            password: passwordEntered,
        };
        //   props.onAddUserData(userData);
        setUsernameEntered("");
        setPasswordEntered("");

    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input onChange={usernameHandler}
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    value={usernameEntered}
                ></input>
                <input onChange={passwordHandler}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={passwordEntered}
                ></input>
                <button type="submit">Login</button>
            </form>
            <p >
                Don't have account? <Link to="/signup">Signup</Link>
            </p>
        </>
    );
}

export default Login;