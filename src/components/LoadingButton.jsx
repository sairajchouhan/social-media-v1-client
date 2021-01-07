import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const LoadingButton = ({ isLoading, variant, children, ...rest }) => {
  return (
    <Button variant={variant} disabled={isLoading} {...rest}>
      {isLoading && (
        <Spinner
          as='span'
          animation='grow'
          size='sm'
          role='status'
          aria-hidden='true'
          className='mr-2'
        />
      )}
      {children}
    </Button>
  );
};

LoadingButton.defaultProps = {
  variant: 'primary',
};

export default LoadingButton;
