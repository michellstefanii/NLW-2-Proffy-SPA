import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/auth";

import logoImg from "../../assets/images/logo.svg";

import "./styles.css";

const SignIn: React.FC = () => {
  const history = useHistory();

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSign(e: any) {
    e.preventDefault();
    try {
      await signIn(email, password);
      history.push("/");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="page-login">
      <div id="page-login-content" className="container">
        <div className="logo-login-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <div className="login-form">
          <form name="Loggin" onSubmit={handleSign}>
            <h1>Faça seu Login</h1>
            <input
              className="input"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        <div className="buttons-login-container">
            <button className="login" type="submit">
                Entrar
            </button>

            <button type="button" onClick={() => history.push('/register')} className="register-classes">
                Registrar
            </button>
        </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
