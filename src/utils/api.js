import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
  (config) => {
    console.log('request config', JSON.parse(JSON.stringify(config)));
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
      //   config.headers['x-access-token'] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalConfig = err.config;
    // console.log('originalConfig', JSON.parse(JSON.stringify(originalConfig)));
    if (
      originalConfig.url !== '/auth/login' &&
      originalConfig.url !== '/auth/refresh-token' &&
      err.response
    ) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post('/auth/refresh-token', {
            refreshToken: localStorage.getItem('refreshToken'),
          });
          const {accessToken} = rs.data;
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            return instance(originalConfig);
          }
          return;
        } catch (_error) {
          console.log('error', _error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
