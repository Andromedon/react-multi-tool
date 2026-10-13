import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

const ToolHeader = ({ title, description, icon }: {
  title: string;
  description: string;
  icon: ReactNode;
}) => (
  <Box className='tool-header'>
    <Box className='tool-header-icon' sx={{ color: 'primary.main' }} aria-hidden='true'>
      {icon}
    </Box>
    <Box>
      <Typography component='h1' variant='h5' sx={{ fontSize: { xs: '1.65rem', sm: '2rem' } }}>
        {title}
      </Typography>
      <Typography color='text.secondary'>{description}</Typography>
    </Box>
  </Box>
);

export default ToolHeader;
