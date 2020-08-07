import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.6:3333'
})

api.defaults.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJtZXVlbWFpbEBlbWFpbC5jb20iLCJpYXQiOjE1OTY4MTUwNDgsImV4cCI6MTU5NjkwMTQ0OH0.9Shn45MkSOn2HmhyfNztVuhAi5O-z2ecD7F11OVJU48`;

export default api;