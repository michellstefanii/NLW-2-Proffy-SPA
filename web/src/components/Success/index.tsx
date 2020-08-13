import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import Check from '../../assets/images/icons/check.svg';

interface Props {
    title: string;
    subtitle: string;
    subtitle2: string;
    buttonTitle: string;
}

const Success: React.FC<Props> = ({ title, subtitle, subtitle2, buttonTitle }) => {
    const history = useHistory();
  return (
        <div id="sucess-container">
            <img src={Check} alt="Success"/>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <p>{subtitle2}</p>
            <button onClick={() => {history.push('/login')}}>
                {buttonTitle}
            </button>
        </div>
    );
}

export default Success;