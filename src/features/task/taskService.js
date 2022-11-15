import axios from 'axios'
const URL = process.env.REACT_APP_API_URL+'/api/todos/'

//Get all Tasks
const getTasks = async (token, taskVariation)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(URL, config)
    if(taskVariation === 'dashboard'){
        return response.data
    }
    else{
        return response.data.filter(d=>d.status===taskVariation)
    }
}

//Add new Task
const createTask = async (token, taskData) =>{
    const data = {
        todo: taskData.taskName,
        description: taskData.taskDescription
    }
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(URL, data, config)
    return response.data
}

//Delete task
const deleteTask = async (token, taskId)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        } 
    }
    const response = await axios.delete(URL+`${taskId}`, config)
    return response.data
}

//Update task status
const editTaskStatus = async (data, token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(URL+`${data.taskId}`,{status: data.status} ,config)
    return response.data
}

export const taskService = {
    getTasks,
    createTask,
    deleteTask,
    editTaskStatus
}