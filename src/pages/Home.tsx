import { useEffect } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { warmGradients } from '../theme';

const Home = () => {
  useEffect(() => { document.title = 'Home'; }, []);

  return (
    <>
      <Box className='home-hero'>
        <img src='/multitool-icon.svg' alt='' className='home-logo' />
        <Typography component='h1' variant='h3'>Your everyday toolkit.</Typography>
        <Typography color='text.secondary' sx={{ mt: 2, maxWidth: 480, mx: 'auto' }}>
          A little help in the kitchen. A little rhythm for your workout.
          Choose a tool and make it yours.
        </Typography>
      </Box>
      <Box className='home-tools'>
        <Card sx={{ background: warmGradients.peach }}>
          <CardActionArea component={Link} to='/converter' className='tool-shortcut'>
            <CardContent>
              <AutorenewIcon className='shortcut-icon' color='primary' />
              <Typography component='h2' variant='h5' sx={{ mt: 2 }}>Converter</Typography>
              <Typography color='text.secondary' sx={{ my: 2 }}>
                Swap butter, oil and margarine with the right amounts.
              </Typography>
              <Box className='shortcut-action'>Open converter <ArrowForwardIcon fontSize='small' /></Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ background: warmGradients.rose }}>
          <CardActionArea component={Link} to='/workouttimer' className='tool-shortcut'>
            <CardContent>
              <AlarmOnIcon className='shortcut-icon' color='secondary' />
              <Typography component='h2' variant='h5' sx={{ mt: 2 }}>Workout Timer</Typography>
              <Typography color='text.secondary' sx={{ my: 2 }}>
                Keep track of your sets and take a well-timed break.
              </Typography>
              <Box className='shortcut-action'>Start a workout <ArrowForwardIcon fontSize='small' /></Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
};

export default Home;
