import { useState, useEffect } from 'react';

import api from '../api';

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token');
    })

    useEffect(() => {
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`
            setAuthenticated(true);
        } else {
            api.defaults.headers.Authorization = undefined
            localStorage.removeItem('token');
            setAuthenticated(false);
        }
    }, [token]);

    async function handleLogin(token: string, name: string) {
        localStorage.setItem('token', token)
        localStorage.setItem('name', name)
        setToken(token)
        api.defaults.headers.Authorization = `Bearer ${token}`
        setAuthenticated(true);
    }

    function handleLogout() {
        localStorage.setItem('token', '');
        localStorage.removeItem('token');
        setAuthenticated(false);
    }

    return { authenticated, handleLogin, handleLogout };
}