import React, { useState, useContext, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/auth";

import "./styles.css";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";

const SignIn: React.FC = () => {
  const history = useHistory();

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSign(e: FormEvent) {
    e.preventDefault();
    try {
      await signIn(email, password);
      history.push("/");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="page-login-form" className="container">
      <PageHeader
        title="Digite seus dados para entrar na plataforma."
      />
      <main>
          <form onSubmit={handleSign}>
          <fieldset>
          <legend>Faça seu login</legend>
          <Input
              name="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="Senha"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <footer>
            <button type="submit">
              Entrar
            </button>
              
            <button onClick={() => history.push('/register')}>
              Criar conta
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
