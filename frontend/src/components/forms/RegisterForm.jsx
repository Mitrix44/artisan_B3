import { useEffect, useState } from 'react'
import Button from './button/Button'
import Input from './input/Input'
import './form.css'
import { validateRegisterForm } from '../../services/FormAuthValidation'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm() {
  const { state: { user, jwt, error, loading }, register } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  const [formData, setFormData] = useState({
    firstName: 'Dimitri',
    lastName: 'Beziau',
    username: 'Mitrix05',
    email: 'dimitri.beziau@gmail.com',
    password: 'test44'
  })

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null

  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const _errors = validateRegisterForm(formData)
    if (Object.keys(_errors).length !== 0) {
      setErrors(_errors)
      console.log(_errors)
    } else {
      register(formData)
    }
  }
  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <Input
        label='Nom'
        name='lastName'
        placeholder='Entrez votre nom...'
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <Input
        label='prénom'
        name='firstName'
        placeholder='Entrez votre prénom...'
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <Input
        label="Nom d'utilisateur"
        name='username'
        placeholder='Entrez votre identifiant...'
        value={formData.userName}
        onChange={handleChange}
      />
      <Input
        label='email'
        name='email'
        placeholder='Entrez votre adresse email...'
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label='mot de passe'
        name='password'
        placeholder='Entrez votre mot de passe...'
        value={formData.password}
        onChange={handleChange}
      />
      <Button type='submit'>S'enregistrer</Button>
    </form>
  )
}
