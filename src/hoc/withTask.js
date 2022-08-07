import { useEffect } from "react"
import { useDispatch,} from 'react-redux'
import { getTasks, reset} from '../features/task/taskSlice';

const withTask = (WrappedComponent, entity) =>{

    const NewComponent = ()=>{
        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(getTasks(entity))
        }, [dispatch])
        
        return <WrappedComponent/>
    }

    return NewComponent
}
export default withTask