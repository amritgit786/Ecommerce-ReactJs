// src/store/AuthProvider.js
import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async (loginData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const res = await axios.post(
        `http://localhost/dbcategory/register/login.php`,
        loginData,
        config
      );
      if (
        res.data.email === loginData.email &&
        res.data.password === loginData.password
      ) {
        localStorage.setItem("reg_id", JSON.stringify(res.data.reg_id));
        localStorage.setItem("email", JSON.stringify(res.data.email));
        localStorage.setItem(
          "userName",
          res.data.first_name + " " + res.data.last_name
        );
        setIsLoggedIn(true);
        navigate("/");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log("Error occurred while logging in:", error);
      alert("Error occurred while logging in");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("reg_id");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
