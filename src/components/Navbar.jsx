import { NavLink, useNavigate } from "react-router-dom";
import { authValue } from "../context/AuthContext";
import LoadingCircle from "./LoadingCircle";

const Navbar = () => {

  const user = authValue()
  
  return (
    user ? (
    <header>
      <span translate="no">
        Mini<b>Blog</b>
      </span>
  
      <nav>
        <NavLink translate="Início" to="/">
          Home
        </NavLink>
        <NavLink to="/newpost">New Post</NavLink>
        <NavLink to="/dashboard">Profile</NavLink>
      </nav>
    </header>
    ) : (
      <header>
      <span translate="no">
        Mini<b>Blog</b>
      </span>
  
      <nav>
        <NavLink translate="Início" to="/">
          Home
        </NavLink>
        <NavLink to="/login">Sign In</NavLink>
      </nav>
    </header>
    ) 
  );
};

export default Navbar;
