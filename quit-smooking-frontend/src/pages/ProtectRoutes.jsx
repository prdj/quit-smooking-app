import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectRoutes = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoutes;
