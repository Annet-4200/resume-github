import { FC, useCallback } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const NotFoundUser: FC = () => {
  const navigate = useNavigate()
  const goHomeHandler = useCallback(() => navigate('/'), [navigate]);
  return (
    <>
      <h1>
        USER NOT FOUND
      </h1>
      <p>
        Unfortunately, user with such username was not found. Please, try again
      </p>
      <div className='button-container'>
        <Button
          color='secondary'
          fullWidth={true}
          onClick={goHomeHandler}
          variant='contained'
        >
          Go Home
        </Button>
      </div>
    </>
  )
};
