import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {

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
            <h1>Signup</h1>
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
                <button type="submit">Sign Up</button>
            </form>
            <p >
              Already have account? <Link to="/login">Login</Link>
            </p>
        </>
    );
}

export default Signup;