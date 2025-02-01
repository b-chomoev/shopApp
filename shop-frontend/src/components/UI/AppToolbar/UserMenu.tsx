import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser, unsetUser } from '../../../features/users/usersSlice.ts';
import { logout } from '../../../features/users/usersThunks.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const userAdmin = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(unsetUser());
  };

  return (
    <>
      <Button color='inherit' onClick={handleClick}>
        Hello, {user.username}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {userAdmin && userAdmin.role === 'admin' && <MenuItem>Admin</MenuItem>}
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;