import { NavLink } from "react-router-dom";
import { authValue } from "../context/AuthContext";

const Navbar = () => {
  const user = authValue();

  return (
    <header>
      <span translate="no">
        <a href="/">
          Mini<b>Blog</b>
        </a>
      </span>
      <nav>
        {user ? (
          <>
            <NavLink translate="Início" to="/">
              Home
            </NavLink>
            <NavLink to="/newpost">New Post</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink  to="/about">About</NavLink>
          </>
        ) : (
          <>
            <NavLink translate="Início" to="/">
              Home
            </NavLink>
            <NavLink to="/login">Sign In</NavLink>
            <NavLink  to="/about">About</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
