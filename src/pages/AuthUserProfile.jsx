import React from 'react';
import ProfileUserInfo from '../components/ProfileUserInfo';
import ProfileUserPosts from '../components/ProfileUserPosts';

import useUserPostsQuery from '../hooks/useUserPostsQuery';
import { useUserContext } from '../context/userContext';

const Profile = () => {
  const {
    userState: { user },
  } = useUserContext();

  const { data: posts, isLoading, isError, error } = useUserPostsQuery(
    user?.username
  );

  if (isError) return <h1>{error.message}...</h1>;
  if (isLoading || !user) return <h1>Loading...</h1>;

  return (
    <div className='mt-4'>
      <ProfileUserInfo user={user} isAuthUser={true} />
      <ProfileUserPosts user={user} posts={posts} isAuthUser={true} />
    </div>
  );
};

export default Profile;
