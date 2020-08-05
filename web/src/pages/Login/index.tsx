import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    
    const history = useHistory()

    // const { handleLogin } = useContext(Context);
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogon(e: any) {
        e.preventDefault()
        try {
                //const response = await api.post('users/auth', { email, password })
                
                //handleLogin(response.data.token, response.data.user.name, response.data.user.level)
                history.push('/home')
        } catch(err) {
            alert(err)
        }
    }

  return (
    <div className="logon-container">
    <div className="contentt">
        <section className="form">
        <form onSubmit={handleLogon}>
            <h1>Faça seu Login</h1>

            <input 
            className="input"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            <input 
            className="input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <button className="button" type="submit">Entrar</button>
        </form>
        </section>

    </div>
    </div>
  );
}

export default Login;