import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import { AuthContext } from "../../contexts/auth";

const LoginPage = () => {
  const {login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(email + " " + password);
    login(email, password);
  };

  useEffect(() => {
    setEmail("contatonovo@gmail.com");
    setPassword("$2a$08$BtFXxzTgzy7DWC27nbx5Ue4tJU7KniTBon7EzF.pCPkrX9MSmjNpS");
  }, []);

  return (
    <div id="login">
      <h1 className="title">Login</h1>
      <div className="form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="...Email"
            pattern=".+@.+"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="...Password"
            pattern=".+"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="actions">
          <button onClick={handleLogin} type="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
