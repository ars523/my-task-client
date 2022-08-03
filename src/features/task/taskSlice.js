import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { taskService } from './taskService'

const initialState = {
    tasks: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

//Get all tasks
export const getTasks = createAsyncThunk(
    'task/getTasks',
    async (taskVariation, thunkApi)=>{
        try {
            const token = thunkApi.getState().auth.user.token
            return await taskService.getTasks(token, taskVariation)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)||
                            error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

//Create task
export const createTask = createAsyncThunk(
    'task/createTask',
    async (taskData, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token
        try {
            return await taskService.createTask(token, taskData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)||
            error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

//Delete task
export const deleteTask = createAsyncThunk(
    "task/delete",
    async (taskId, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token
        try {
            return taskService.deleteTask(token, taskId)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)||
            error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

//Edit task status
export const editTaskStatus = createAsyncThunk(
    'task/editTaskStatus',
    async (data, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token
        try {
            return await taskService.editTaskStatus(data, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)||
            error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getTasks.pending, (state)=>{
                state.isError= false
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getTasks.fulfilled, (state, action)=>{
                state.isError= false
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload
            })
            .addCase(getTasks.rejected, (state, action)=>{
                state.isError= true
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
            })

            .addCase(createTask.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(createTask.fulfilled, (state)=>{
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTask.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteTask.pending, (state, action)=>{
                state.isLoading = true
                state.isSuccess = false
                state.isError =false
                state.message = ''
                
            })
            .addCase(deleteTask.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.tasks = state.tasks.filter((task)=>task._id !== action.payload._id)
            })
            .addCase(deleteTask.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editTaskStatus.pending, (state, action)=>{
                state.isLoading = true
                state.isSuccess = false
                state.isError =false
                state.message = ''
                
            })
            .addCase(editTaskStatus.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.tasks = state.tasks.filter((task)=>task._id !== action.payload._id)
            })
            .addCase(editTaskStatus.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = taskSlice.actions
export default taskSlice.reducer