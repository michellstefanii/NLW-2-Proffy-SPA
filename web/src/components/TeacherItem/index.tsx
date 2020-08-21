import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";

export interface Classe {
  class_id: number;
  user_id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface ClassesItemProps {
  classe: Classe;
}

const TeacherItem: React.FC<ClassesItemProps> = ({ classe }) => {
  function createNewConnection() {
    api.post("connections", {
      user_id: classe.user_id,
    });
  }
  return (
    <article className="teacher-item">
      <header>
        <img src={classe.avatar} alt={classe.name} />
        <div>
          <strong>{classe.name}</strong>
          <span>{classe.subject}</span>
        </div>
      </header>

      <p>{classe.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {classe.cost}</strong>
        </p>

        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={createNewConnection}
          href={`https://wa.me/${classe.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
