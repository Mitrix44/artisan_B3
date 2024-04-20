import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const loginApi = async (credentials) => {
  const response = await axiosInstance.post('auth/local', credentials)
  return response?.data
}
const registerApi = async (credentials) => {
  const response = await axiosInstance.post('auth/local/register', credentials)
  return response?.data
}

export { loginApi, registerApi }
