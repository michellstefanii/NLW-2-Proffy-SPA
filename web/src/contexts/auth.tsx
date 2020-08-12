import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    bio?: string;
  }
  signIn(email: string, password: string): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  })
  const [user, setUser] = useState(() => {

    if(JSON.parse(localStorage.getItem('user')!) && token) {
      let { id, name, email } = JSON.parse(localStorage.getItem('user')!)

    return {
      id: id ? id : 0,
      name: name ? name : '',
      email: email ? email : '',
    }} else {
      return {
        id: 0,
        name: '',
        email: '',
      }
    }
  });

  useEffect(() => {
    if (!(user.id === 0) && token) {
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`
        api.post('users/authenticated').catch((res) => {
          if (res){
            signOut()
         }
        })
      } catch (err) {
        signOut()
      }
    }
  }, [user.id, token]);

  async function signIn(email: string, password: string) {

    await api.post('users/auth', { email, password }).then((res: any) => {
      setToken(token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      api.defaults.headers.Authorization = `Bearer ${res.data.token}`
    })
  }

  function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.defaults.headers.Authorization = undefined
    setUser({
      id: 0,
      name: "",
      email: ""
    });
  }

  return (
    <AuthContext.Provider value={{ signed: !(user.id === 0), user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;