import React from 'react';

import './styles.css';

import Check from '../../assets/images/icons/check.svg'

const Success: React.FC = () => {
  return (
        <div id="sucess-container">
            <img src={Check} alt="Success"/>
            <h1>Redefinição enviada!</h1>
            <p>Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.</p>
            <button>
                Voltar
            </button>
        </div>
    );
}

export default Success;