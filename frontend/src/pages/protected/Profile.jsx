import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/authContext'
import validator from 'validator'
import { toast } from 'react-toastify'

export default function Profile() {
  const { state: { user, jwt, error, loading }, login } = useAuth()
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: ''
  })
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = async (event) => {
    if (validator.matches(formData.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      async function updateInfos() {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}users/${user.id}`, formData, {
          headers: {
            'Content-Type': 'application / json',
            accept: 'application/json',
            Authorization: `Bearer ${jwt}`
          }
        })

        return response.data
      }
      const response = await updateInfos()
      console.log(response)

      // await axios.put(`${process.env.REACT_APP_API_URL}users/${user.id}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     accept: 'application/json',
      //     Authorization: `Bearer ${jwt}`
      //   },
      //   body: JSON.stringify(formData)
      // })
    } else {
      toast.error('Le mot de passe doit contenir au minimum un nombre,une lettre majuscule et minuscule et un minimum de 6 caraactères')
    }
  }
  // const [user, setUser] = useState({})
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get(`${process.env.REACT_APP_API_URL}users/me?populate=*`, {
  //       headers: {
  //         Authorization: `Bearer ${jwt}`
  //       }
  //     })
  //     setUser(response.data)
  //   }
  //   fetchData()
  // }, [])
  // console.log(user)
  return (
    <>
      <h1 className='my-7'>Mon profile</h1>
      <Input
        className='my-7'
        name='username'
        label='Utilisateur'
        type='text'
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        className='my-7'
        name='email'
        label='Email'
        type='email'
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        className='my-7'
        name='password'
        label='Nouveau mot de passe'
        type='password'
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} color='primary'>
        Mettre à jour
      </Button>
    </>
  )
}
