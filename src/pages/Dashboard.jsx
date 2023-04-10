import React from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuthentication();

  return (
    <div>
      Dashboard
      <Link to="/login/">
        <button onClick={logout}>Exit</button>
      </Link>
    </div>
  );
};

export default Dashboard;
