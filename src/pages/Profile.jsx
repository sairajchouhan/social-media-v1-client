import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileUserInfo from '../components/ProfileUserInfo';
import ProfileUserPosts from '../components/ProfileUserPosts';

import useUserQuery from '../hooks/useUserQuery';
import useUserPostsQuery from '../hooks/useUserPostsQuery';

const Profile = () => {
  const { username } = useParams();
  const { data: user, isLoading, isError } = useUserQuery(username);
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useUserPostsQuery(username);

  if (isError || isErrorPosts) return <h1>no user found</h1>;
  if (isLoading || isLoadingPosts) return <h1>Loading...</h1>;

  return (
    <div className='mt-4'>
      <ProfileUserInfo user={user} />
      <ProfileUserPosts user={user} posts={posts} />
    </div>
  );
};

export default Profile;
