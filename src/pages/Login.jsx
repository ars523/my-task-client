import { Button, Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { signIn } from '../features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../componests/Spinner';
import { TextFieldPrimary } from '../shared/textField';
import {reset} from '../features/auth/authSlice'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, isSuccess, isError, isLoading, message} = useSelector(state=>state.auth)
    useEffect(()=>{
        if(isError){
            console.log(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    },[user, isSuccess, isError, message, navigate, dispatch])

    const [singInInfo, setSignInInfo] = useState({
        email: '',
        password: '',
    })

    const [errorText, setErrorText] = useState({
        email: '',
        password: ''
    })

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(signIn(singInInfo))

    }

    const onChange = (e) => {
        const newSignInInfo = { ...singInInfo }
        newSignInInfo[e.target.name] = e.target.value;
        setSignInInfo(newSignInInfo)

        if (e.target.name === 'email') {
            let isEmailValid = validateEmail(e.target.value)
            const newErrorText = { ...errorText }
            if (!isEmailValid) {
                newErrorText.email = 'Enter valid email'
                setErrorText(newErrorText)
            }
            else {
                newErrorText.email = ''
                setErrorText(newErrorText)
            }
        }

        if (e.target.name === 'password') {
            let isPasswordValid = e.target.value.length >= 6
            const newErrorText = { ...errorText }
            if (!isPasswordValid) {
                newErrorText.password = 'Enter correct password'
                setErrorText(newErrorText)
            }
            else {
                newErrorText.password = ''
                setErrorText(newErrorText)
            }
        }
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    if(isLoading){
        return <Spinner/>
    }
    return (
        <Container maxWidth='sm'
            sx={{
                display: 'flex',
                alignItems: 'center',
                mt: '6rem'
            }}>
            <Paper sx={{ p: '4rem 2rem' }}>
                <Typography variant='h4' align='center' sx={{ color: 'primary.main' }}>
                    Sign In
                </Typography>
                <Grid container rowSpacing={2} component='form' onSubmit={onSubmit}>
                    <Grid item xs={12}>
                        <TextFieldPrimary
                            variant='standard'
                            fullWidth
                            type='email'
                            label='Email'
                            name='email'
                            error={errorText.email !== ''}
                            helperText={errorText.email}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldPrimary
                            variant='standard'
                            fullWidth
                            type='password'
                            label='Password'
                            name='password'
                            error={errorText.password !== ''}
                            helperText={errorText.password}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: '1rem' }}>
                        <Button
                            variant='contained'
                            type='submit'
                            fullWidth
                            disabled={singInInfo.email.length < 1 ||
                                singInInfo.password.length < 1 ||
                                errorText.email !== '' ||
                                errorText.password !== ''
                            }
                        >
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Login;