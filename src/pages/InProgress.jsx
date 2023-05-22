import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../componests/Spinner';
import Tasks from '../componests/Tasks';
import withTask from '../hoc/withTask';
import LayoutPrimary from '../layouts/LayoutPrimary';

const InProgress = () => {
    const { isLoading } = useSelector(state => state.task)
    return (
        <LayoutPrimary>
            {isLoading? <Spinner/>: <Tasks heading={'Task In Progress'} />}
        </LayoutPrimary>
    );
};

export default withTask(InProgress, 'pending');