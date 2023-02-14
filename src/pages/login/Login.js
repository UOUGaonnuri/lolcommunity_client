import React, { useState } from "react";
import "./Login.css";
import LoginContent from "./LoginContent";
import axios from "axios";
const Login = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    };

    let res = await axios.get("/users/login", config);
    setUser(res.data.data);
  };

  return (
    <div className="login_container">
      <LoginContent />
    </div>
  );
};

export default Login;
