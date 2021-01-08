import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
// import { useUserContext } from '../context/userContext';
import Axios from '../utils/axios';

const EditProfile = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  // const { userState } = useUserContext();
  // const { user } = userState;
  const bioRef = useRef();
  const { data, isLoading, isError } = useQuery(['profile'], async () => {
    const { data } = await Axios.get('/users/profile/me');
    return data;
  });
  console.log(data);

  const { mutate, isLoading: isLoadingM } = useMutation(
    (values) => {
      return Axios.put(`/users/profile`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile');
        history.push(`/me`);
        console.log('successfully updated profile');
      },
    }
  );

  if (isLoading || isLoadingM) return <h1>Loading...</h1>;
  if (isError) return <h1>Error... </h1>;

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log(bioRef.current.value);
    mutate({ bio: bioRef.current.value });
  };

  return (
    <Form
      className='mt-3'
      onSubmit={handleProfileSubmit}
      style={{ maxWidth: '500px', marginRight: 'auto' }}
    >
      <Form.Group controlId='formBasicBio'>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          ref={bioRef}
          name='bio'
          type='text'
          placeholder='Update bio'
          defaultValue={data?.profile?.bio}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Update
      </Button>
    </Form>
  );
};

export default EditProfile;
