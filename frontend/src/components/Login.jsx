import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//import Services from "../services/Services";

const Login = (props) => {
    const [usernameEntered, setUsernameEntered] = useState("");
    const [passwordEntered, setPasswordEntered] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const usernameHandler = (event) => {
        setUsernameEntered(event.target.value);
    }
    const passwordHandler = (event) => {
        setPasswordEntered(event.target.value);
    }

    const loginHandler = (event) => {
        event.preventDefault();
        if (
            passwordEntered.trim().length === 0 ||
            usernameEntered.trim().length === 0
        ) {
            // props.onError(true);
            return null;
        }
        setLoading(true);
    }

    useEffect(() => {
        const login = async () => {
            try {
                const formdata = new FormData();
                formdata.append("username", usernameEntered);
                formdata.append("password", passwordEntered);

                const requestOptions = {
                    method: "POST",
                    body: formdata,
                };

                const response = await fetch(
                    "http://localhost:8000/api/v1/dj-rest-auth/login/",
                    requestOptions
                );

                if (response.ok) {
                    const data = await response.json();
                    setError(false);
                    localStorage.setItem("token", data.key);
                    localStorage.setItem("user", usernameEntered);
                    props.loginHandler(true);
                    props.userHandler(usernameEntered);
                    navigate("/dashboard");
                } else {
                    setError(true);
                }
            } catch (e) {
                console.log("login", e);
                setError(true);
            } finally {
                setLoading(false);
                setUsernameEntered("");
                setPasswordEntered("");
            }
        };

        if (loading) {
            login();
        }
    }, [loading]);

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={loginHandler}>
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
            {loading && <div>
                <p>Loading...</p>
            </div>}
            {error && <div>
                <h1>Error!</h1>
            </div>}
            <p>
                Don't have account? <Link to="/signup">Signup</Link>
            </p>
        </>
    );
}

export default Login;