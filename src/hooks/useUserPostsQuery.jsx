import { useQuery } from 'react-query';
import Axios from '../utils/axios';

const getPostsOfUser = async (username) => {
  const { data } = await Axios.get(`/posts?username=${username}`);
  return data;
};

export default function usePost(username) {
  return useQuery(['userPosts', username], () => getPostsOfUser(username));
}
