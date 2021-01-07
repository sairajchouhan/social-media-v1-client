import axios from 'axios';
import { URL } from './constants';
export default axios.create({
  withCredentials: true,
  baseURL: URL,
});
