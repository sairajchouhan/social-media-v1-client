import { useQuery } from 'react-query';
import Axios from '../utils/axios';

const getPostById = async (postId) => {
  const { data } = await Axios.get(`/posts/${postId}`);
  return data;
};

export default function usePost(postId) {
  return useQuery(['post', postId], () => getPostById(postId));
}
