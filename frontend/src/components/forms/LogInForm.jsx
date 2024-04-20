import { useEffect, useState } from 'react'
import './form.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { Button, Input } from '@nextui-org/react'

export default function LogInForm() {
  const [formData, setFormData] = useState({
    identifier: 'bruce@wayne.com',
    password: 'batman'
  })

  const { state: { user, jwt, error, loading }, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    login(formData)
  }
  if (error) {
    console.log(error)
  }
  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      <Input
        name='identifier'
        label='Email'
        placeholdrer='rentrez votre adresse email'
        type='email'
        value={formData.identifier}
        onChange={handleChange}
      />
      <Input
        name='password'
        label='Mot de passe'
        placeholdrer=''
        type='password'
        value={formData.password}
        onChange={handleChange}
      />
      {error && <p style={{ color: 'red' }}>{JSON.stringify(error)}</p>}
      <Button
        color='primary'
        isLoading={loading}
        type='submit'
      >Se connecter
      </Button>
    </form>
  )
}
