import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: user || null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

//Sign In user
export const signIn = createAsyncThunk('auth/signIn', async (user, thunkApi) => {
    try {
        return await authService.signIn(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = ''
                state.user = action.payload
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }


})
export const {reset} = authSlice.actions
export default authSlice.reducer