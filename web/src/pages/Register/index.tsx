import React, { useState, FormEvent, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import PageHeader from "../../components/PageHeader";
import api from "../../services/api";
import AuthContext from "../../contexts/auth";

const Register: React.FC = () => {
  const history = useHistory();

  const { signIn } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    try {
      await api.post('users', {
        name,
        email,
        password,
        avatar,
        whatsapp,
        bio,
      }).then(() => {
        signIn(email, password);
      });
      history.push("/")
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="page-register-form" className="container">
      <PageHeader
        title="Que maneiro que você quer se registrar."
        description="O primeiro passo é preencher o formulario de cadastro"
      />
      <main>
        <form onSubmit={handleRegister}>
          <fieldset>
            <legend>Crie sua conta</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
              Salvar cadastro
            </button>

            <button onClick={() => history.push('/login')}>
              Já tenho cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Register;
