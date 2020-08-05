import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost.com:3333',
});

api.interceptors.response.use(
    response => {  
      return response
    },
    error => { 
      if (error.response.status === 401) {
        const requestConfig = error.config
  
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        api.defaults.headers.Authorization = undefined;
        window.location.reload()  
  
        return axios(requestConfig)
      }
  
      return Promise.reject(error)
    },
  )

export default api