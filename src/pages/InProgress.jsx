import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../componests/Spinner';
import Tasks from '../componests/Tasks';
import { getTasks } from '../features/task/taskSlice';

const InProgress = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.task)

    useEffect(() => {
        dispatch(getTasks('pending'))
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <Tasks heading={'Task In Progress'} />
    );
};

export default InProgress;