import React from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import LoadingButton from '../components/LoadingButton';

dayjs.extend(relativeTime);

const ProfileUserPosts = ({ posts, isAuthUser }) => {
  const history = useHistory();

  return (
    <Row className='mt-5'>
      {posts.map((post) => (
        <Col sm={12} md={6}>
          <Card key={post.id} className='mt-3'>
            <Card.Header>
              <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex flex-column'>
                  <div as='h5' className='m-0'>
                    {post.user.username}
                  </div>
                  <div className='text-muted'>
                    {dayjs(post.createdAt).fromNow()}
                  </div>
                </div>
                <div>
                  {isAuthUser && (
                    <OverlayTrigger
                      placement='bottom'
                      overlay={
                        <Tooltip id={`tooltip-edit-post`}>Edit Post</Tooltip>
                      }
                    >
                      <LoadingButton
                        variant='outline-success'
                        onClick={() => history.push(`/edit/posts/${post.id}`)}
                      >
                        <i class='far fa-edit'></i>
                      </LoadingButton>
                    </OverlayTrigger>
                  )}
                </div>
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
              <Card.Link>
                <strong className='mr-1 text-primary'>{post.likesCount}</strong>
                <span className='text-primary'>likes</span>
              </Card.Link>
              <Card.Link>
                <strong className='mr-1 text-primary'>
                  {post.commentsCount}
                </strong>
                <span className='text-primary'>comments</span>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

ProfileUserPosts.defaultProps = {
  isAuthUser: false,
};

export default ProfileUserPosts;
