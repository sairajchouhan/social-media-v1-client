import { useQuery } from 'react-query';
import Axios from '../utils/axios';

const getUserByUsername = async (username) => {
  const { data } = await Axios.get(`/users/${username}`);
  return data;
};

export default function usePost(username) {
  return useQuery(['user', username], () => getUserByUsername(username));
}
