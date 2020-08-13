import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import api from "../../services/api";

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css';
import Success from '../../components/Success';

const RecoveryPassword: React.FC = () => {
    const [success, setSuccess] = useState(false);
    
    const [email, setEmail] = useState("");

    async function handleRecoveryPassword(e: FormEvent) {
        e.preventDefault();
        try {
          setSuccess(true)
        } catch (err) {
          alert(err);
        }
      }

  return (
      <>
      {success 
      ? <Success 
          title="Redefinição enviada!" 
          subtitle="Boa, agora é só checar o e-mail que foi enviado para você" 
          subtitle2="redefinir sua senha e aproveitar os estudos."
          buttonTitle="Voltar ao login"
        />
      : <div id="recoverypassword-form-container">
          <div className="left-container">
              <div className="top-bar-container">
                  <Link to="/login">
                      <img src={backIcon} alt="Voltar"/>
                  </Link>
              </div>
          <form onSubmit={handleRecoveryPassword}>
              <h2>Eita, esqueceu sua senha?</h2>
              <p>Não esquenta, vamos dar um jeito nisso.</p>
              <Input
                  id="leftborder"
                  name="email"
                  placeholder="E-mail"
                  label={email ? "E-mail" : undefined}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
              <footer>
                  <button type="submit">
                  Concluir cadastro
                  </button>
              </footer>
              </form>
          </div>
          <div className="recoverypassword-logo-container">
                  <img src={logoImg} alt="Proffy"/>
                  <h2>Sua plataforma de estudos online.</h2>
          </div>
      </div>
      }
      </>
  );
}

export default RecoveryPassword;