import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/authContext'
import validator from 'validator'
import { toast } from 'react-toastify'

export default function UpdateProfile () {
  const { state: { user, jwt }, login, logout } = useAuth()
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: '',
    password2: ''
  })
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = async () => {
    if (formData.password === formData.password2) {
      if (validator.matches(formData.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
        async function updateInfos () {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}users/${user.id}`, formData, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${jwt}`
            }
          })

          return response
        }
        const response = await updateInfos()
        if (response.status === 200) {
          toast.success('Profil mis à jour')
          login({
            identifier: formData.email,
            password: formData.password
          })
        }
      } else {
        toast.error('Le mot de passe doit contenir au minimum un nombre,une lettre majuscule et minuscule et un minimum de 6 caraactères')
      }
    } else {
      toast.error('Les mots de passe ne correspondent pas')
    }
  }
  const handleSuppress = async () => {
    async function suppressUser () {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}users/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      })
      return response
    }
    const response = await suppressUser()
    if (response.status === 200) {
      toast.success('Votre compte a été supprimé')
      logout()
    } else {
      console.log(response)
      toast.error('Une erreur est survenue')
    }
  }
  return (
    <div className='flex flex-col w-full items-center my-7'>
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
      <Input
        className='my-7'
        name='password2'
        label='Retapez le nouveau mot de passe'
        type='password'
        onChange={handleChange}
      />
      <Button className='my-7' onClick={handleSubmit} color='primary'>
        Mettre à jour
      </Button>
      <a onClick={() => handleSuppress()} className='text-red-400'>
        Supprimer mon compte
      </a>
    </div>
  )
}
