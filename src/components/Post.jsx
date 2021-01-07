import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

import Axios from '../utils/axios';
import { useUserContext } from '../context/userContext';

dayjs.extend(relativeTime);

const Post = ({ post }) => {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const history = useHistory();

  const {
    userState: { isAuthenticated },
  } = useUserContext();

  const { mutate } = useMutation(
    (postId) => {
      return Axios.get(`/like/${postId}`);
    },
    {
      onSuccess: (response) => {
        const { data } = response;
        if (pathname === '/') {
          queryClient.invalidateQueries('posts');
        }
        if (pathname === `/posts/${data.id}`) {
          queryClient.invalidateQueries(['post', data.id]);
        }
      },
    }
  );

  const handleLike = async () => {
    if (!isAuthenticated) return history.push('/login?redirect=');
    mutate(post.id);
  };

  return (
    <Card key={post.id} className='mt-3'>
      <Card.Header>
        <div className='d-flex flex-column'>
          <div as='h5'>{post.user.username}</div>
          <div className='text-muted'>{dayjs(post.createdAt).fromNow()}</div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title
          style={{ cursor: 'pointer' }}
          onClick={() => history.push(`/posts/${post.id}`)}
          as='h3'
        >
          {post.title}
        </Card.Title>
        <Card.Text>{post.body}</Card.Text>
        <Card.Link onClick={handleLike}>
          <Button variant='primary'>
            <span className='mr-1'>{post.likesCount}</span>
            <i className='fas fa-thumbs-up'></i>
          </Button>
        </Card.Link>
        <Card.Link as={Link} to={`/posts/${post.id}`}>
          <Button variant='primary'>
            <span className='mr-1'>{post.commentsCount}</span>{' '}
            <i className='fas fa-comment'></i>
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Post;
