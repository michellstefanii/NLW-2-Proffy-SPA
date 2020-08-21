import React, { useState, FormEvent, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import PageHeader from "../../components/PageHeader";
import api from "../../services/api";
import AuthContext from "../../contexts/auth";

import cameraIcon from '../../assets/images/icons/camera.svg'
import warningIcon from "../../assets/images/icons/warning.svg";

const Profile: React.FC = () => {
  const history = useHistory();

  const { signIn, user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  async function handleProfile(e: FormEvent) {
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
      history.push("/");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="page-profile-form" className="container">
      <PageHeader />
      <div className="avatar">
        <img src={user.avatar} alt=""/>
        <img src={cameraIcon} alt=""/>
      </div>
      <main>
        <form onSubmit={handleProfile}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="inline-input">
            <Input
              name="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            </div>
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
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar dados</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Profile;
