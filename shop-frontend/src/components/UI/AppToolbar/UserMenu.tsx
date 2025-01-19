import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';
import React, { useState } from 'react';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <Button color='inherit' onClick={handleClick}>
        Hello, {user.username}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My Account</MenuItem>
        <MenuItem>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;