import { useSelector } from 'react-redux';
import Spinner from '../componests/Spinner';
import Tasks from '../componests/Tasks';
import withTask from '../hoc/withTask';
import LayoutPrimary from '../layouts/LayoutPrimary';

const Completed = () => {
    const { isLoading } = useSelector(state => state.task)
    return (
        <LayoutPrimary>
            {isLoading? <Spinner/>: <Tasks heading={'Completed Tasks'} />}
        </LayoutPrimary>
    );
};

export default withTask(Completed, 'completed');