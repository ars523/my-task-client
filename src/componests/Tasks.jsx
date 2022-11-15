import { Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { HeadingPrimary } from '../shared/heading';
import Spinner from './Spinner';
import EditModal from './EditModal';
import DeleteDialog from './DeleteDialog';
import Error from './Error';

const Tasks = (props) => {
    const { tasks, isLoading } = useSelector(state => state.task)

    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <HeadingPrimary variant='h4' component='h1'>
                    {props.heading}
                </HeadingPrimary>
            </Grid>
            <>
                {
                    tasks.length === 0 ? (
                        <Grid item xs={12}>
                            <Error message="No task found" />
                        </Grid>
                    ) : <>
                        {
                            tasks.map(task => (
                                <Grid
                                    item
                                    xs={12} md={4}
                                    key={task._id}
                                >
                                    <Paper sx={{
                                        p: '1rem',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                    >
                                        <Typography
                                            variant='h5'
                                            component='h2'
                                            sx={{ mb: '0.75rem', color: 'grey.800' }}>
                                            {task.todo}
                                        </Typography>
                                        <Typography
                                            variant='subtitle1'
                                            sx={{ mb: '0.75rem', color: 'grey.700' }}>
                                            {task.description}
                                        </Typography>
                                        <Stack direction="row" justifyContent='space-between' alignItems='center'>
                                            <Stack direction="row" alignItems='center'>
                                                <Typography>
                                                    {new Date(task.createdAt).toLocaleString('en-us')}
                                                </Typography>
                                                <EditModal taskId={task._id} status={task.status} />
                                                <DeleteDialog taskId={task._id} />
                                            </Stack>

                                            <Typography
                                                variant='overline'
                                                component='div'
                                                align='center'
                                                sx={{
                                                    bgcolor: 'primary.main',
                                                    p: '2px 12px',
                                                    color: 'white',
                                                    borderRadius: '1000px',
                                                    fontSize: '10px',
                                                    fontWeight: 500,
                                                    letterSpacing: '1px'
                                                }}
                                            >
                                                {task.status}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </>
                }
            </>
        </Grid >
    );
};

export default Tasks;