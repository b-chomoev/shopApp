import React, { useState } from 'react';
import { RegisterMutation } from '../../types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError } from './usersSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { googleLogin, login } from './usersThunks';
import Alert from '@mui/material/Alert';
import { GoogleLogin } from '@react-oauth/google';

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const loginError = useAppSelector(selectLoginError);
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterMutation>({
        username: '',
        password: '',
        email: '',
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

        await dispatch(login(form)).unwrap();
        navigate('/');
    };

    const googleLoginHandler = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
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

                {loginError && (
                    <Alert severity="error" sx={{mt: 3, width: '100%'}}>
                        {loginError.error}
                    </Alert>
                )}

                <Box sx={{pt: 2}}>
                    <GoogleLogin onSuccess={(credentialResponse => {
                        if (credentialResponse.credential) {
                            void googleLoginHandler(credentialResponse.credential);
                        }
                    })} onError={() => alert('Login Failed')}/>
                </Box>

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
