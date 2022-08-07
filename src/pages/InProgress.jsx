import React from 'react';
import {useSelector } from 'react-redux';
import Spinner from '../componests/Spinner';
import Tasks from '../componests/Tasks';
import withTask from '../hoc/withTask';

const InProgress = () => {
    const { isLoading } = useSelector(state => state.task)
    if (isLoading) {
        return <Spinner />
    }
    return (
        <Tasks heading={'Task In Progress'} />
    );
};

export default withTask(InProgress, 'pending');