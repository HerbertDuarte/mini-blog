import { NavLink } from "react-router-dom";
import { authValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { useEffect } from "react";

const Navbar = () => {
  const user = authValue();
  const { logout } = useAuthentication();

  return (
    <header>
      <span translate="no">
        <a href="/">
          H<b>Blog</b>
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
