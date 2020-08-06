import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css';
import AuthContext from '../../contexts/auth';

interface Props {
  title: string;
  description?: string;
}

const PageHeader: React.FC<Props> = (props) => {
  const { signOut, user, signed } = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  function logged() {
    if (signed){
    return (<div><p>Olá {user.name}</p> <button onClick={handleSignOut}> Sair</button></div>)}
  }
  
  return (
    <header className="page-header">
    <div className="top-bar-container">
    <Link to="/">
        <img src={backIcon} alt="Voltar"/>
    </Link>
    {logged()}
      <img src={logoImg} alt="Proffy"/>
    </div>
    <div className="header-content">
      <strong>{props.title}</strong>
      { props.description && <p>{props.description}</p> }
      
      {props.children}
    </div>
  </header>
  );
}

export default PageHeader;