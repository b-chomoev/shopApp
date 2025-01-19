import React, { useState } from 'react';
import { RegisterMutation } from '../types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectRegisterError } from './usersSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from './usersThunks.ts';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.error('Failed to register:', e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
          <Grid container direction={'column'} size={12} spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={form.username}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={form.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid size={12}>
              <NavLink to={'/register'}>
                Doesn't have an account yet? Sign up
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;