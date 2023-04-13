import { useNavigate, useParams } from 'react-router';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Link, Paper, Typography } from '@mui/material';
import { NotFoundUser } from './NotFound';
import { colorsMap } from '../../constants';
import { useUserData } from '../../hooks/use-user-data/useUserData';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const Profile: FC = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const {
    userProfileData,
    userReposData,
    loading,
    error,
    joinDate
  } = useUserData(username!)
  
  const [notFound, setNotFound] = useState<boolean>(false);
  
  useEffect(() => {
    if (!error) return
    switch (error) {
      case 'NOT_FOUND':
        setNotFound(true)
        break;
      default:
        navigate('/')
    }
  }, [error])
  
  const goHomeHandler = useCallback(() => navigate('/'), [navigate]);
  
  return (
    <div className='home-container'>
      <Paper elevation={20}>
        <div className='paper-container'>
          {
            loading
              ? (<p>Loading...</p>)
              : notFound
                ? <NotFoundUser />
                : (
                  <>
                    <div className='inline'>
                      <img alt='user avatar' src={userProfileData?.avatar_url} />
                      <div className='name-container'>
                        <h1>
                          {userProfileData?.name}
                        </h1>
                        <p>
                          Member since {joinDate}, {userProfileData?.public_repos} public repositories
                        </p>
                      </div>
                    </div>
                    <h2>Recently edited repositories</h2>
                    {
                      userReposData?.map((item, index) => {
                        const pieData = Object.keys(item.languages)
                          .map((lang, i) => ({ name: lang, value: item.languages[lang] }));
                        return (
                          <Box marginBottom={4} width={'100%'}>
                            <Card
                              elevation={3}
                            >
                              <div className={'inline'}>
                                <div>
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                      {item.name}
                                    </Typography>
                                    <Typography textAlign={'left'} variant="body2" color="text.secondary">
                                      {item.description ?? 'No description'}
                                    </Typography>
                                  </CardContent>
                                </div>
                                <Box justifyContent={'center'}>
                                  <PieChart width={300} height={200}>
                                    <Pie
                                      data={pieData}
                                      color="#000000"
                                      dataKey="value"
                                      nameKey="name"
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={60}
                                      fill="#8884d8"
                                    >
                                      {pieData.map((entry, index) => (
                                        <Cell
                                          key={`cell-${index}`}
                                          fill={colorsMap[index % colorsMap.length]}
                                        />
                                      ))}
                                    </Pie>
                                    <Legend />
                                  </PieChart>
                                </Box>
                              </div>
                              <CardActions>
                                <Link href={item.html_url} underline='hover' color='inherit'>
                                  <Button size="small">Learn More</Button>
                                </Link>
                              </CardActions>
                            </Card>
                          </Box>
                        )
                      })
                    }
                  </>
                )
          }
          <div className='button-container'>
            <Button
              color='secondary'
              fullWidth={true}
              variant='contained'
              onClick={goHomeHandler}
            >
              Go Home
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}
