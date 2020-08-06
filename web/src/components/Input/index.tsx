import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({ name, label, type, ...rest }) => {
  return (
    <div className="input-block">
        <label htmlFor={name}>{label}</label>
        <input type={type ? type : 'text'} id={name} { ...rest } />
    </div>
  );
}

export default Input;