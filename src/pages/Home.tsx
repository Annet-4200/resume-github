import { useCallback } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { Button, Paper, TextField } from '@mui/material';
///////////////////////////////////////////////////////////////////////////////////////////////////

type FormValues = {
  username: string
}

const initialValues = {
  username: ''
};

export const Home = () => {
  const navigate = useNavigate();
  
  const navigateToUserProfile = useCallback((values: FormValues) => {
    navigate(`/${values.username}`);
  }, [navigate]);
  
  const { values, handleSubmit, handleChange } = useFormik<FormValues>({
    initialValues,
    onSubmit: navigateToUserProfile,
  });
  
  return (
    <div className='home-container'>
      <form onSubmit={handleSubmit}>
        <Paper elevation={20}>
          <div className='paper-container'>
            <h1>
              Create your GitHub resume
            </h1>
            <p>
              Please, enter your GitHub username and click on Submit button for resume creation.
            </p>
            <div className='input-inline'>
              <div className='input-container'>
                <TextField
                  variant='filled'
                  name='username'
                  fullWidth={true}
                  color='secondary'
                  label='Enter username'
                  value={values.username}
                  onChange={handleChange}
                />
              </div>
              <div className='button-container'>
                <Button
                  type='submit'
                  color='secondary'
                  fullWidth={true}
                  variant='contained'
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </form>
    </div>
  );
}
