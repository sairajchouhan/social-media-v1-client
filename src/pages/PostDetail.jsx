import React from 'react';
import { useParams } from 'react-router-dom';

import usePost from '../hooks/usePost';
import Post from '../components/Post';
import Comments from '../components/Comments';

const PostDetail = () => {
  const { pid } = useParams();
  const { isLoading, isError, data: post, error } = usePost(pid);

  if (isError) return <h1>{error.message}</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Post post={post} />
      <Comments postId={post.id} />
    </>
  );
};

export default PostDetail;
