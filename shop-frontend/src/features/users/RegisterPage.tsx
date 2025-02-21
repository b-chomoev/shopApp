
import { useState } from 'react';
import { RegisterMutation } from '../../types';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Avatar, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError } from './usersSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from './usersThunks';

const regEmail = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,3})$/;

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{email?: string}>({});
  const [form, setForm] = useState<RegisterMutation>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({...prevState, [name]: value}));

    if (name === 'email') {
      if (regEmail.test(value)) {
        setErrors(prevState => ({...prevState, email: ''}));
      } else {
        setErrors(prevState => ({...prevState, email: 'Invalid email format'}));
      }
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                id="email"
                label="Email"
                name="email"
                value={form.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email')) || Boolean(errors.email)}
                helperText={getFieldError('email') || errors.email}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                required
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

            <Grid size={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('confirmPassword'))}
                helperText={getFieldError('confirmPassword')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid >
              <NavLink to='/login'>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
