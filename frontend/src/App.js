import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

//Import Components
import NavBar from "./components/UI/NavBar.jsx";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./components/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const NoMatch = lazy(() => import("./components/NoMatch"));

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <>
      <NavBar user={user}/>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login tokenHandler={setToken} userHandler={setUser} />}
          />
          {/* Dashboard requiere token */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
