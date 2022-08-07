import axios from 'axios'
const API_URL = '/api/users/'

const signIn = async (user) => {
    const response = await axios.post(API_URL + 'login', user)

    if (response) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const signUp = async (user) => {
    const response = await axios.post(API_URL + 'register', user)

    if (response) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    signIn,
    logout,
    signUp
}
export default authService