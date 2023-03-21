import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
    return (
        <>
            <p>{props.user}</p>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
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