import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../users/usersSlice.ts';
import AnonymousMenu from './AnonymousMenu.tsx';
import UserMenu from './UserMenu.tsx';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <Link to="/">CompStore</Link>
        </Typography>

          {user ?
            <>
              <UserMenu user={user}/>
            </>
            :
            <>
              <AnonymousMenu/>
            </>
          }
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;