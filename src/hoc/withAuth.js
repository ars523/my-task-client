import { Button, Container, Grid, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Spinner from "../componests/Spinner"
import { reset, signIn, signUp } from "../features/auth/authSlice"
import { TextFieldPrimary } from "../shared/textField"
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';

const withAuth = (WrappedComponent, entity) => {

    const NewComponent = () => {
        const theme = useTheme();
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const { user, isSuccess, isError, isLoading, message } = useSelector(state => state.auth)

        useEffect(() => {
            if (isError) {
                toast.error(message)
                reset()
            }
            if (isSuccess || user) {
                navigate('/')
            }
            dispatch(reset())
        }, [user, isSuccess, isError, message, navigate, dispatch])

        const [singInInfo, setSignInInfo] = useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        })

        const [errorText, setErrorText] = useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        })
        const { name, email, password } = singInInfo

        const onSubmit = (e) => {
            e.preventDefault()
            if (entity === 'signin') {

                dispatch(signIn({ email, password }))
            }
            else if (entity === 'signup') {
                dispatch(signUp({ name, email, password }))
            }


        }

        const onChange = (e) => {
            const newSignInInfo = { ...singInInfo }
            newSignInInfo[e.target.name] = e.target.value;
            setSignInInfo(newSignInInfo)

            if (e.target.name === 'name') {
                let isNameValid = e.target.value.length >= 3
                const newErrorText = { ...errorText }
                if (!isNameValid) {
                    newErrorText.name = 'Name should be atleast 3 character'
                    setErrorText(newErrorText)
                }
                else {
                    newErrorText.name = ''
                    setErrorText(newErrorText)
                }
            }
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
                    newErrorText.password = 'Length should be 6 or more'
                    setErrorText(newErrorText)
                }
                else {
                    newErrorText.password = ''
                    setErrorText(newErrorText)
                }
            }

            if (e.target.name === 'confirmPassword') {
                const newErrorText = { ...errorText }
                if (singInInfo.password === e.target.value) {
                    newErrorText.confirmPassword = ''
                    setErrorText(newErrorText)
                }
                else {
                    newErrorText.confirmPassword = 'Password not matched'
                    setErrorText(newErrorText)
                }
            }
        }

        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        if (isLoading) {
            return <Spinner />
        }
        const linkStyle = {
            color: theme.palette.primary.main,
            fontWeight: '600'
        }
        return <WrappedComponent>
            <Container maxWidth='sm'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: '6rem'
                }}>
                <Paper sx={{ p: '4rem 2rem' }}>
                    <Typography variant='h4' align='center' sx={{ color: 'primary.main' }}>
                        {entity === 'signin' ? 'Sign In' : 'Sign Up'}
                    </Typography>
                    <Grid container rowSpacing={2} component='form' onSubmit={onSubmit}>
                        {
                            entity === 'signup' && (
                                <Grid item xs={12}>
                                    <TextFieldPrimary
                                        variant='standard'
                                        fullWidth
                                        type='text'
                                        label='Name'
                                        name='name'
                                        error={errorText.name !== ''}
                                        helperText={errorText.name}
                                        onChange={onChange}
                                    />
                                </Grid>
                            )
                        }
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
                        {
                            entity === 'signup' && (
                                <Grid item xs={12}>
                                    <TextFieldPrimary
                                        variant='standard'
                                        fullWidth
                                        type='password'
                                        label='Confirm Password'
                                        name='confirmPassword'
                                        error={errorText.confirmPassword !== ''}
                                        helperText={errorText.confirmPassword}
                                        onChange={onChange}
                                    />
                                </Grid>
                            )
                        }
                        <Grid item xs={12} sx={{ mt: '1rem' }}>
                            {
                                entity === 'signin'
                                    ? (
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
                                    ) : (
                                        <Button
                                            variant='contained'
                                            type='submit'
                                            fullWidth
                                            disabled={singInInfo.email.length < 1 ||
                                                singInInfo.password.length < 1 ||
                                                singInInfo.confirmPassword.length < 1 ||
                                                singInInfo.name.length < 1 ||
                                                errorText.email !== '' ||
                                                errorText.password !== '' ||
                                                errorText.confirmPassword !== '' ||
                                                errorText.name !== ''
                                            }
                                        >
                                            Signup
                                        </Button>
                                    )
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {
                                entity === 'signin' ? (
                                    <Stack direction='row' alignItems='center' spacing={2}>
                                        <Typography variant="subtitle1">
                                            No account?
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            <Link to='/registration' style={linkStyle}>Signup</Link>
                                        </Typography>
                                    </Stack>
                                ) : (
                                    <Stack direction='row' alignItems='center' spacing={2}>
                                        <Typography variant="subtitle1">
                                            Already have an account?
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            <Link to='/login' style={linkStyle}>Signin</Link>
                                        </Typography>
                                    </Stack>
                                )
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </WrappedComponent>
    }
    return NewComponent
}
export default withAuth