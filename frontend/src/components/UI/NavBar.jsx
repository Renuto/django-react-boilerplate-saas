import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./NavBar.css"

const NavBar = (props) => {

  const [logoutResponse, setLogoutResponse] = useState(null);
  const [isLogout, setIsLogout] = useState(null);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setLogoutResponse(data);
     
      props.loginHandler(null);
      props.userHandler(null);
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');
    } catch (error) {
      console.error(error);
    }
    setIsLogout(null);
  };
  const setIsLogoutHandler = () => {
    setIsLogout(true);
  }

  useEffect(() => {
    if (isLogout) {
      logoutHandler();
    }
  }, [isLogout]);

  useEffect(() => {
    if (logoutResponse) {
      navigate('/login/');
    }
  }, [logoutResponse]);

  return (
    <>
      <p>{props.user}</p>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {props.user ?
            <li><NavLink onClick={setIsLogoutHandler}>Logout</NavLink></li> :
            <li><NavLink to="/login">Login</NavLink></li>
          }

          <li>
            <NavLink to="/signup">Sign up</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;