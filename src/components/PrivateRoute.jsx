import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useUserContext } from '../context/userContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userState } = useUserContext();
  console.log(userState);
  if (!userState) {
    console.log('user still is not loaded');
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        userState.isAuthenticated === false ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
