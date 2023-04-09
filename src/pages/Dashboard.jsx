import React from "react";
import { useAuthentication } from "../hooks/useAuthentication";

const Dashboard = () => {
  const { logout } = useAuthentication();

  return (
    <div>
      Dashboard
      <button onClick={logout}>Exit</button>
    </div>
  );
};

export default Dashboard;
