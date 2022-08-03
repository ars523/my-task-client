import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../componests/Spinner';
import Tasks from '../componests/Tasks';
import { getTasks } from '../features/task/taskSlice';

const Cancelled = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.task)

    useEffect(() => {
        dispatch(getTasks('cancelled'))
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <Tasks heading={'Cancelled Tasks'} />
    );
};

export default Cancelled;