import React from 'react';
import { Button, Container, Grid, Paper } from '@mui/material'
import { HeadingPrimary } from '../shared/heading';
import { TextFieldPrimary } from '../shared/textField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../features/task/taskSlice';
import { useNavigate } from 'react-router-dom'
import Spinner from '../componests/Spinner';
import { toast } from 'react-toastify';
import LayoutPrimary from '../layouts/LayoutPrimary';


const AddTask = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading } = useSelector(state => state.task)


    const [taskData, setTaskData] = useState({
        taskName: '',
        taskDescription: ''
    })
    const onChange = (e) => {
        setTaskData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }
    const handleCreateTask = (e) => {
        e.preventDefault()
        dispatch(createTask(taskData))
            .unwrap()
            .then((res) => {
                navigate('/')
                toast.success('Created successfully')
            })
            .catch(error => {
                toast.error(error)
            })

    }
    return (
        <LayoutPrimary>
            <Container maxWidth='md' sx={{ mt: '2rem' }}>
                <Paper component='form' onSubmit={handleCreateTask} sx={{ p: '2rem 2rem' }}>
                    <Grid container rowSpacing={4}>
                        <Grid item>
                            <HeadingPrimary variant='h5' component='h1'>Add New</HeadingPrimary>
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldPrimary
                                label='Task Name'
                                fullWidth
                                name='taskName'
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldPrimary
                                multiline rows={4}
                                inputProps={{ style: { color: '#0B72B9' } }}
                                label='Task Description'
                                fullWidth
                                name='taskDescription'
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {
                                isLoading? <Button
                                variant='contained'
                                sx={{ display: 'block', ml: 'auto' }}
                            >
                                Createing...
                            </Button>:
                            <Button
                            variant='contained'
                            type='submit'
                            sx={{ display: 'block', ml: 'auto' }}
                        >
                            Create
                        </Button>
                            }
                            
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </LayoutPrimary>
    );
};

export default AddTask;