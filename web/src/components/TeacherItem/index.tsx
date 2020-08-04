import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
    <header>
      <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHQz33a0Les0w/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=suO5lY0avmxAir3pIx4YXpOmTde7nq5lm52ikO6MKVs" alt="Michel Stefani"/>
    <div>
      <strong>Michel Stefani</strong>
      <span>Química</span>
    </div>
    </header>

    <p>
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    <br /> <br />
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors
    </p>

    <footer>
      <p>
        Preço/hora 
        <strong>R$ 100,00</strong>
      </p>

      <button type="button">
        <img src={whatsappIcon} alt="Whatsapp"/>
        Entrar em contato
      </button>
    </footer>
  </article>
  );
}

export default TeacherItem;