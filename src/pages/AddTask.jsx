import React from 'react';
import { Button, Container, Grid, Paper } from '@mui/material'
import { HeadingPrimary } from '../shared/heading';
import { TextFieldPrimary } from '../shared/textField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask} from '../features/task/taskSlice';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Spinner from '../componests/Spinner';


const AddTask = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isSuccess, isLoading, isError, message} = useSelector(state=>state.task)

    useEffect(()=>{
        if(isError){
            console.log(message)
        }
        if(isSuccess){
            navigate('/')
        }
    }, [ navigate, message, isError, dispatch, isSuccess])

    const [taskData, setTaskData] = useState({
        taskName: '',
        taskDescription: ''
    })
    const onChange = (e)=>{
        setTaskData((data)=>({...data, [e.target.name]: e.target.value}))
    }
    const handleCreateTask = (e)=>{
        e.preventDefault()
        dispatch(createTask(taskData))

    }
    if(isLoading){
        return <Spinner/>
    }
    return (
        <Container maxWidth='md' sx={{ mt: '2rem' }}>
            <Paper component='form' onSubmit={handleCreateTask} sx={{ p: '2rem 2rem' }}>
                <Grid container rowSpacing={4}>
                    <Grid item>
                        <HeadingPrimary variant='h4' component='h1'>Add New</HeadingPrimary>
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldPrimary
                            label='Task Name'
                            fullWidth
                            name ='taskName'
                            onChange = {onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldPrimary
                            multiline rows={4}
                            inputProps={{ style: { color: '#0B72B9' } }}
                            label='Task Description' 
                            fullWidth
                            name ='taskDescription'
                            onChange = {onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            type='submit'
                            sx={{ display: 'block', ml: 'auto' }}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default AddTask;