import { useEffect, useState } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import LogInForm from '../components/forms/LogInForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false)

  const navigate = useNavigate()

  const { state: { jwt, user } } = useAuth()

  useEffect(() => {
    if (jwt && user) {
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      {
        isRegister
          ? <RegisterForm />
          : <LogInForm />
      }
      <a onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
      </a>
    </>

  )
}
