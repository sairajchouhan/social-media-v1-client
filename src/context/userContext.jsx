import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Axios from '../utils/axios';
import { URL } from '../utils/constants';

export const initialState = {
  isAuthenticated: false,
  user: null,
};

export const userReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'UNSET_USER':
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserProvider = ({ initialState, reducer, children }) => {
  const [userState, defaultDispatch] = useReducer(reducer, initialState);
  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get(`/users/me`);
        dispatch('SET_USER', data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
