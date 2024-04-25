import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductList from '../../components/DashBoard/ProductList'

export default function Dashboard() {
  const navigate = useNavigate()
  const { state: { jwt }, logout } = useAuth()
  const [_user, _setUser] = useState({})
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}users/me?populate[0]=role&populate[1]=artisan`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        _setUser(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getUser()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }
  return (
    <>
      <h2>Dashboard</h2>
      <div className='d-flex flex-row justify-end w-full'>
        <Button color='primary' onClick={() => { navigate('/dashboard/new-product') }}>Ajouter un produit</Button>
      </div>
      {_user.artisan && <ProductList artisanId={_user.artisan.id} />}
      <Button onClick={handleLogout}>
        Se déconnecter
      </Button>
    </>
  )
}
