import React from 'react';
import Post from '../components/Post';
import usePosts from '../hooks/usePosts';

const Home = () => {
  const { isLoading, isError, data, error } = usePosts();

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Home;
