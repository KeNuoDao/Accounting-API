import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust the port if necessary
  timeout: 1000,
});

export default instance;
