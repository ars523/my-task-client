import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getTasks} from '../features/task/taskSlice';
import Spinner from '../componests/Spinner';
import Tasks from '../componests/Tasks';
const NewTasks = () => {
    const dispatch = useDispatch()
    const {isLoading } = useSelector(state => state.task)

    useEffect(() => {
        dispatch(getTasks('new'))
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <Tasks heading={'New tasks'} />
        </>
    );
};

export default NewTasks;