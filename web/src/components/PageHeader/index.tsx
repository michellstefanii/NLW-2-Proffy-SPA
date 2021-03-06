import React, { useContext } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";
import poweroffIcon from "../../assets/images/icons/poweroff.svg";
import AvatarIcon from "../../assets/images/icons/avatar-person.svg";

import "./styles.css";
import AuthContext from "../../contexts/auth";

interface Props {
  title?: string;
  description?: string;
}

const PageHeader: React.FC<Props> = (props) => {
  const { signOut, user, signed } = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        {signed ? (
          <div className="user-logged">
            <button onClick={handleSignOut}>
              <img src={poweroffIcon} alt="" />
            </button>
          </div>
        ) : undefined}
        <img src={logoImg} alt="Proffy" />
      </div>
      <div className="header-content">
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}

        {props.children}

        {signed ? (
          <div className="user">
            <Link to="/profile">
              {user.avatar ? <img src={user.avatar} alt="" /> : <img src={AvatarIcon} alt="" />  }
              <h5>{user.name}</h5>
            </Link>
          </div>
        ) : undefined}
      </div>
    </header>
  );
};

export default PageHeader;
