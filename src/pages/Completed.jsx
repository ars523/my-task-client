import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../componests/Spinner';
import Tasks from '../componests/Tasks';
import { getTasks} from '../features/task/taskSlice';

const Completed = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.task)

    useEffect(() => {
        dispatch(getTasks('completed'))
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <div>
            <Tasks heading={'Completed Tasks'}/>
        </div>
    );
};

export default Completed;