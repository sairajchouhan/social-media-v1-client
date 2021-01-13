import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { useForm } from '../hooks/useForm';
import Axios from '../utils/axios';

const CreatePost = () => {
  const history = useHistory();
  const [values, handleChange] = useForm({ title: '', body: '' });

  const { mutate } = useMutation(
    (values) => {
      return Axios.post('/posts', values);
    },
    {
      onSuccess: () => {
        history.push('/');
      },
    }
  );

  const handlePostCreate = (e) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <Form
      className='mt-3'
      onSubmit={handlePostCreate}
      style={{ maxWidth: '500px', marginRight: 'auto' }}
    >
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          name='title'
          type='text'
          placeholder='Enter title'
          value={values.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId='exampleForm.ControlTextarea1'>
        <Form.Label>Body</Form.Label>
        <Form.Control
          name='body'
          as='textarea'
          rows={5}
          placeholder='Body of the post'
          value={values.body}
          onChange={handleChange}
        />
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        disabled={values.title.trim() === '' || values.body.trim() === ''}
      >
        Post
      </Button>
    </Form>
  );
};

export default CreatePost;
