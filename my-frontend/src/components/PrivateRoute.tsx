import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:3005/api/users/check-auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoggedIn === null) return <div>Loading...</div>;
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
