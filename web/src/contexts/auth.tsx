import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string;
    bio: string;
  }
  signIn(email: string, password: string): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  })

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
    } else {
      api.defaults.headers.Authorization = undefined
      localStorage.removeItem('token');
    }
  }, [token]);

  async function signIn(email: string, password: string) {

    await api.post('users/auth', { email, password }).then((res: any) => {
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user)
      setToken(token)
      api.defaults.headers.Authorization = `Bearer ${res.data.token}`
    })
  }

  function signOut() {
    localStorage.removeItem('token');
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;