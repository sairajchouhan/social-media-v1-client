import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import Axios from '../utils/axios';
import { useForm } from '../hooks/useForm';
import { useUserContext } from '../context/userContext';
import LoadingButton from '../components/LoadingButton';

const Login = () => {
  const history = useHistory();
  const {
    userState: { isAuthenticated },
    dispatch,
  } = useUserContext();
  const [values, handleChange] = useForm({ email: '', password: '' });
  const [error, setError] = useState('');
  const { location } = history;
  const redirect = location.search.split('=')[1] || '';

  useEffect(() => {
    if (isAuthenticated) history.push(`/${redirect}`);
  }, [isAuthenticated, history, redirect]);

  const { mutate, isLoading } = useMutation(
    (values) => {
      return Axios.post(`/auth/login`, values, { withCredentials: true });
    },
    {
      onSuccess: (response) => {
        setError('');
        const { data } = response;
        dispatch('SET_USER', data);
        history.push(`/${redirect}`);
      },
      onError: (err) => {
        setError(err.response.data.error);
      },
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <Form className='mt-3' noValidate onSubmit={handleLogin}>
      <h1 className='text-primary mb-4'>Log In</h1>
      <div style={{ maxWidth: '400px', marginRight: 'auto' }}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name='email'
            value={values.email}
            type='email'
            placeholder='Enter email'
            onChange={handleChange}
          />
          {error && (
            <Form.Text className='text-danger'>{`**${error}`}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
            value={values.password}
            type='password'
            placeholder='Password'
            onChange={handleChange}
          />
          {error && (
            <Form.Text className='text-danger'>{`**${error}`}</Form.Text>
          )}
        </Form.Group>
        <LoadingButton isLoading={isLoading} onClick={handleLogin}>
          Submit
        </LoadingButton>
      </div>
    </Form>
  );
};

export default Login;
