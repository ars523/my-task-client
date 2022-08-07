import { Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Spinner from '../componests/Spinner';
import withTask from '../hoc/withTask';
import { HeadingPrimary } from '../shared/heading';

const Dashboard = () => {
    const { isLoading, tasks } = useSelector(state => state.task)
    
    const getCountOfTaskStatus = (status) => {
        const count = tasks.filter(task => task.status === status).length
        return count
    }

    if (isLoading) {
        return <Spinner />
    }
    const paperStyle = {
        p: '2rem'
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <HeadingPrimary variant='h4' component='h1'>Dashboard</HeadingPrimary>
            </Grid>
            <Grid item xs={12} md={3}>
                <Paper sx={paperStyle}>
                    <Typography variant='h5' component='h4' sx={{pb: '1rem', color: 'grey.700'}}>Total Completed</Typography>
                    <Typography variant='h6' component='p' sx={{color: 'grey.700'}}>{getCountOfTaskStatus('completed')}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
                <Paper sx={paperStyle}>
                    <Typography  variant='h5' component='h4' sx={{pb: '1rem', color: 'grey.700'}}>Total In Progress</Typography>
                    <Typography variant='h6' component='p' sx={{color: 'grey.700'}}>{getCountOfTaskStatus('pending')}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
                <Paper sx={paperStyle}>
                    <Typography variant='h5' component='h4' sx={{pb: '1rem', color: 'grey.700'}}>Total New</Typography>
                    <Typography variant='h6' component='p' sx={{color: 'grey.700'}}>{getCountOfTaskStatus('new')}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
                <Paper sx={paperStyle}>
                    <Typography variant='h5' component='h4' sx={{pb: '1rem', color: 'grey.700'}}>Total Cancelled</Typography>
                    <Typography variant='h6' component='p' sx={{color: 'grey.700'}}>{getCountOfTaskStatus('cancelled')}</Typography>
                </Paper>
            </Grid>


        </Grid>
    );
};

export default withTask(Dashboard, 'dashboard');