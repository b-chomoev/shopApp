<<<<<<< HEAD
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser, unsetUser } from '../../../features/users/usersSlice.ts';
import { logout } from '../../../features/users/usersThunks.ts';
import { useNavigate } from 'react-router-dom';
=======
import { Button, Menu, MenuItem } from "@mui/material";
import { User } from "../../../types";
import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hooks.ts";
import { unsetUser } from "../../../features/users/usersSlice.ts";
import { logout } from "../../../features/users/usersThunks.ts";
>>>>>>> 80e8f09 (Some changes.)

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.username}
      </Button>
<<<<<<< HEAD
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {userAdmin && userAdmin.role === 'admin' && <MenuItem onClick={() => {
          navigate('/admin');
          setAnchorEl(null);
        }}
        >
          Admin
        </MenuItem>}
=======
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My Account</MenuItem>
>>>>>>> 80e8f09 (Some changes.)
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
