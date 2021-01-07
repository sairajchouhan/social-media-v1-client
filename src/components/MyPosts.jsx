import React from 'react';
import { useParams } from 'react-router-dom';

const MyPosts = () => {
  const { username } = useParams();
  return <div>Posts of {username}</div>;
};

export default MyPosts;
