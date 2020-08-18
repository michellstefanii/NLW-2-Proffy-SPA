import React, { useState, FormEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import api from "../../services/api";
import AuthContext from "../../contexts/auth";

import logoImg from '../../assets/images/logo.svg'
import eyeImg from '../../assets/images/icons/eye-regular.svg'
import eyeBlockImg from '../../assets/images/icons/eye-slash-regular.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css';
import Success from '../../components/Success';

const Register: React.FC = () => {

    const { signIn } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        try {
          await api.post('users', {
            name,
            email,
            password,
            whatsapp,
          }).then(() => {
            signIn(email, password);
          });
          setSuccess(true)
        } catch (err) {
          alert(err);
        }
      }

    function handleTogglePasswordVisible(){
        setIsPasswordVisible(!isPasswordVisible);
      }

  return (
      <>
      {success 
      ? <Success 
          title="Cadastro concluído" 
          subtitle="Agora você faz parte da plataforma da Proffy." 
          subtitle2="Tenha uma ótima experiência."
          buttonTitle="Fazer login"
        />
      : <div id="register-form-container">
          <div className="left-container">
              <div className="top-bar-container">
                  <Link to="/login">
                      <img src={backIcon} alt="Voltar"/>
                  </Link>
              </div>
          <form onSubmit={handleRegister}>
              <h2>Cadastro</h2>
              <p>Preencha os dados abaixo para começar.</p>
              <Input
                  id="leftborder"
                  name="name"
                  placeholder="Nome completo"
                  label={name ? "Nome completo" : undefined}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
              <Input
                  id="leftborder"
                  name="whatsapp"
                  placeholder="Whatsapp"
                  label={whatsapp ? "Whatsapp" : undefined}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  />
              <Input
                  id="leftborder"
                  name="email"
                  placeholder="E-mail"
                  label={email ? "E-mail" : undefined}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
              <div className="password-container">
              <Input
                  className="leftboarder"
                  id="leftborder"
                  placeholder="Senha"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  label={password ? "Senha" : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              { isPasswordVisible 
              ? <img src={eyeBlockImg} onClick={handleTogglePasswordVisible} alt="Mostrar senha"/>
              : <img src={eyeImg} onClick={handleTogglePasswordVisible} alt="Esconder senha"/>}
              </div>
              <footer>
                  <button type="submit">
                  Concluir cadastro
                  </button>
              </footer>
              </form>
          </div>
          <div className="register-logo-container">
                  <img src={logoImg} alt="Proffy"/>
                  <h2>Sua plataforma de estudos online.</h2>
          </div>
      </div>
      }
      </>
  );
}

export default Register;