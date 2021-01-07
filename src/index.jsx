import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider, initialState, userReducer } from './context/userContext';
import { QueryClient, QueryClientProvider } from 'react-query';

import './bootstrap.min.css';
import './index.css';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
  <Router>
    <UserProvider initialState={initialState} reducer={userReducer}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UserProvider>
  </Router>,
  document.getElementById('root')
);
