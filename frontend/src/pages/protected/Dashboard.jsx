import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { Button } from '@nextui-org/react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }
  return (
    <>
      <h2>Dashboard</h2>
      <Button onClick={handleLogout}>
        Se déconnecter
      </Button>
    </>
  )
}
