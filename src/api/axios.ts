import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // This matches your NestJS server
});

export default API;