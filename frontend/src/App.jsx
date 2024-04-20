import { NextUIProvider } from '@nextui-org/react'
import './App.css'
import Header from './components/header/Header'
import { AuthProvider } from './context/authContext'
import Router from './navigation/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <NextUIProvider>
      <AuthProvider>
        <Header />
        <Router />
        <ToastContainer position='top-left' />
      </AuthProvider>
    </NextUIProvider>

  )
}

export default App
