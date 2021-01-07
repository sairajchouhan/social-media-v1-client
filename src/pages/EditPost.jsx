import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

import usePost from '../hooks/usePost';
import Axios from '../utils/axios';

const CreatePost = () => {
  const history = useHistory();
  const { pid } = useParams();
  const titleRef = useRef();
  const bodyRef = useRef();
  const { isLoading, isError, data: post, error } = usePost(pid);

  const { mutate } = useMutation(
    (values) => {
      return Axios.put(`/posts/${pid}`, values);
    },
    {
      onSuccess: () => {
        history.push(`/posts/${pid}`);
        console.log('successfully updated');
      },
    }
  );

  const handlePostEdit = (e) => {
    e.preventDefault();
    mutate({ title: titleRef.current.value, body: bodyRef.current.value });
  };

  if (isError) return <h1>{error.message}</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Form
      className='mt-3'
      onSubmit={handlePostEdit}
      style={{ maxWidth: '500px', marginRight: 'auto' }}
    >
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          ref={titleRef}
          name='title'
          type='text'
          placeholder='Enter title'
          defaultValue={post.title}
        />
      </Form.Group>

      <Form.Group controlId='exampleForm.ControlTextarea1'>
        <Form.Label>Body of the post</Form.Label>
        <Form.Control
          name='body'
          as='textarea'
          rows={5}
          ref={bodyRef}
          defaultValue={post.body}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Post
      </Button>
    </Form>
  );
};

export default CreatePost;
