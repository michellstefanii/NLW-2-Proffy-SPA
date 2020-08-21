import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import poweroffIcon from "../../assets/images/icons/poweroff.svg";

import api from "../../services/api";

import "./styles.css";
import AuthContext from "../../contexts/auth";

const Landing: React.FC = () => {
  const { signOut, user, signed } = useContext(AuthContext);

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get("connections").then((res) => {
      setTotalConnections(res.data.total);
    });
  }, [totalConnections]);

  function handleSignOut() {
    signOut();
  }

  return (
    <div id="page-landing">
      <div id="page-landing-content">
        {signed ? (
          <div className="user-logged">
            <p>
              <a href="/profile">
                <img src={user.avatar} alt="" />
                <p>{user.name}</p>
              </a>
            </p>
            <button onClick={handleSignOut}>
              <img src={poweroffIcon} alt="" />
            </button>
          </div>
        ) : undefined}
        <div id="page-center">
          <div className="logo-container">
            <img src={logoImg} alt="Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>

          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />
        </div>
        <span className="welcome">
          <strong>Seja bem-vindo.</strong>
          <p> O que deseja fazer?</p>
        </span>

        <span className="total-connections">
          <p>
            Total de {totalConnections} conexões já realizadas{" "}
            <img src={purpleHeartIcon} alt="Coração roxo" />
          </p>
        </span>

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
