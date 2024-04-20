import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function PrivateRoutes() {
  const { state: { jwt, user } } = useAuth()
  return (
    jwt && user ? <Outlet /> : <Navigate to='/authentication' />
  )
}
