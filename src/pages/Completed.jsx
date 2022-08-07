import {useSelector } from 'react-redux';
import Spinner from '../componests/Spinner';
import Tasks from '../componests/Tasks';
import withTask from '../hoc/withTask';

const Completed = () => {
    const { isLoading } = useSelector(state => state.task)

    if (isLoading) {
        return <Spinner />
    }
    return (
        <div>
            <Tasks heading={'Completed Tasks'}/>
        </div>
    );
};

export default withTask(Completed, 'completed');