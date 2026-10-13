import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import ConstructionIcon from '@mui/icons-material/Construction';
import HomeIcon from '@mui/icons-material/Home';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { warmColors } from '../theme';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

type Page = {
  name: string;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

const LargeStyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  margin: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  &:hover { background: rgba(255, 255, 255, 0.06); }
  &[aria-current='page'] { background: rgba(255, 255, 255, 0.06); font-weight: 700; }
  &:focus-visible { outline: 3px solid white; outline-offset: 2px; }
`;

const SmallStyledLink = styled(NavLink)`
  color: ${warmColors.text};
  text-decoration: none;
  font-weight: 600;
  margin: 0;
  padding: 0.75rem;
  border-radius: 8px;
  position: relative;
  &[aria-current='page'] { background: #FFE4EC; color: ${warmColors.pink}; font-weight: 700; }
`;

const pages: Page[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Converter', href: '/converter', icon: AutorenewIcon },
  { name: 'Workout Timer', href: '/workouttimer', icon: AlarmOnIcon },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar variant='dense'>
          <ConstructionIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'inherit',
              fontWeight: 800,
              letterSpacing: '.04em',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MultiTool
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='Open navigation menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  {React.createElement(page.icon)}
                  <Typography textAlign='center'>
                    <SmallStyledLink to={page.href}>
                      {page.name}
                    </SmallStyledLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ConstructionIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'inherit',
              fontWeight: 800,
              letterSpacing: '.04em',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MultiTool
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <LargeStyledLink to={page.href} key={page.name}>
                {React.createElement(page.icon)}
                {page.name}
              </LargeStyledLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
