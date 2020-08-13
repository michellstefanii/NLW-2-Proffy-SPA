import React, { useState, useContext, FormEvent } from 'react';

import logoImg from '../../assets/images/logo.svg'
import purpleImg from '../../assets/images/icons/purple-heart.svg'
import eyeImg from '../../assets/images/icons/eye-regular.svg'
import eyeBlockImg from '../../assets/images/icons/eye-slash-regular.svg'

import './styles.css';
import Input from '../../components/Input';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/auth';

const Login: React.FC = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const history = useHistory();

    const { signIn } = useContext(AuthContext);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    async function handleSign(e: FormEvent) {
      e.preventDefault();
      try {
        await signIn(email, password)
        history.push("/")
      } catch (err) {
        alert(err);
      }
    }

    function handleTogglePasswordVisible(){
        setIsPasswordVisible(!isPasswordVisible);
      }

  return (
      <>
        <div id="login-form-container">
                <div className="login-logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            <div className="right-container">
                <form onSubmit={handleSign}>
                <h2>Fazer login</h2>
                <Input
                    id="leftborder"
                    placeholder="E-mail"
                    name="email"
                    label={email ? "E-mail" : undefined}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <div className="password-container">
                <Input
                    id="leftborder2"
                    placeholder="Senha"
                    type={isPasswordVisible ? "text" : "password"}
                    name="Senha"
                    label={password ? "Senha" : undefined}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                { isPasswordVisible 
                ? <img src={eyeBlockImg} onClick={handleTogglePasswordVisible} alt="Mostrar senha"/>
                : <img src={eyeImg} onClick={handleTogglePasswordVisible} alt="Esconder senha"/>}
                </div>
                    <div className="form-footer">
                        <input type="checkbox" name="checkbox" id="checkbox" />
                        <label htmlFor="checkbox"><span></span>{'  '}Lembrar-me</label>
                        <label onClick={() => history.push('/recoverypassword')}>Esqueci minha senha</label>
                    </div>
                <footer>
                    <button type="submit">
                    Entrar
                    </button>
                </footer>
                </form>

                <div className="login-form-footer">
                <p>Não tem conta ?<Link to="/register">Cadastre-se</Link></p>
                <p>É de graça  <img src={purpleImg} alt="Proffy"/></p>
                </div>
            </div>
        </div>
      </>
  );
}

export default Login;