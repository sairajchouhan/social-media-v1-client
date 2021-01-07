import React from 'react';
import { Row, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LoadingButton from './LoadingButton';

const bio = `Full-stack web developer | Instructor 👨‍🏫,I am limitless 🌻,Happiness is my goal ❤️,Power of HUSTLE is real 💪`;

const ProfileUserInfo = ({ user, isAuthUser }) => {
  const history = useHistory();
  return (
    <Row>
      <Col xs={12} md={3}>
        <div className='d-flex justify-content-center align-items-start'>
          <Image
            roundedCircle
            src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_176bc9a64cf%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_176bc9a64cf%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
          />
        </div>
      </Col>

      <Col xs={12} md={6}>
        <div className='d-flex align-items-center mb-2'>
          <h2 className='m-0'>{user.username}</h2>
          {!isAuthUser ? (
            <LoadingButton variant='success' className='ml-5'>
              Follow
            </LoadingButton>
          ) : (
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id={`tooltip-edit-profile`}>Edit Profile</Tooltip>
              }
            >
              <LoadingButton
                variant='outline-success'
                className='ml-3'
                onClick={() => {
                  history.push('/edit/profile');
                }}
              >
                <i class='fas fa-user-edit'></i>
              </LoadingButton>
            </OverlayTrigger>
          )}
        </div>
        <Row>
          <Col xs={12} md={8} className='my-2'>
            <div className='d-flex align-items-center justify-content-between'>
              <p>
                <strong>15</strong> posts
              </p>
              <p>
                <strong>156</strong> followers
              </p>
              <p>
                <strong>181</strong> following
              </p>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <div className='d-flex flex-column'>
              {bio.split(',').map((x) => (
                <p
                  style={{ fontSize: '1.2rem' }}
                  className='m-0'
                  key={Math.floor(Math.random() * 1000)}
                >
                  {x}
                </p>
              ))}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

ProfileUserInfo.defaultProps = {
  isAuthUser: false,
};

export default ProfileUserInfo;
