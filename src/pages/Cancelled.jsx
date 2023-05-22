import React from 'react';
import {useSelector } from 'react-redux';
import Spinner from '../componests/Spinner';
import Tasks from '../componests/Tasks';
import withTask from '../hoc/withTask';
import LayoutPrimary from '../layouts/LayoutPrimary';

const Cancelled = () => {
    const { isLoading } = useSelector(state => state.task)
    return (
        <LayoutPrimary>
            {isLoading? <Spinner/>: <Tasks heading={'Cancelled Tasks'} />}
        </LayoutPrimary>
    );
};

export default withTask(Cancelled, 'cancelled');