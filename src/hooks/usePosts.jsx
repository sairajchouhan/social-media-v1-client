import { useQuery } from 'react-query';
import Axios from '../utils/axios';

const getPosts = async () => {
  const { data } = await Axios.get(`/posts`);
  return data;
};

export default function usePosts() {
  return useQuery('posts', getPosts);
}
