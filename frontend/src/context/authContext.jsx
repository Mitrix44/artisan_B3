import { createContext, useContext, useEffect, useReducer } from 'react'
import { loginApi, registerApi } from '../services/Api'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const actionTypes = {
  LOGIN: 'LOGIN', // Connecté avec succès
  REGISTER: 'REGISTER', // Inscrit + connecté avec succès
  LOGOUT: 'LOGOUT', // Deconnecté
  LOADING: 'LOADING', // Chargement
  ERROR: 'ERROR', // Erreur
  RESET: 'RESET' // Remise a zéro
}

const initialState = {
  jwt: null,
  user: null,
  loading: false,
  error: null
}

/**
 *
 * @param {*} prevState etat précédant l'action
 * @param {*} action Action pour mettre a jour l'etat = {type & data}
 */
const authReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
    case actionTypes.LOGIN:
      return {
        jwt: action.data.jwt,
        user: action.data.user,
        loading: false,
        error: null
      }
    case actionTypes.ERROR:
      return {
        jwt: null,
        user: null,
        loading: false,
        error: action.data.error
      }
    case actionTypes.LOADING:
      return {
        ...prevState,
        loading: true
      }
    case actionTypes.RESET:
    case actionTypes.LOGOUT:
      return initialState
    default:
      throw new Error(`Undefined action type : ${action.type}`)
  }
}

const authFactory = (dispatch) => ({
  register: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await registerApi(credentials)
      dispatch({
        type: actionTypes.REGISTER,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      toast.error('Une erreur est survenue')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Une erreur est survenue' }
      })
    }
  },
  login: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await loginApi(credentials)
      dispatch({
        type: actionTypes.LOGIN,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
      // todo reminer la methode
    } catch (error) {
      toast.error('Identifiant ou mot de passe incorect')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Identifiant ou mot de passe incorrect' }
      })
    }
  },
  logout: () => {
    dispatch({ type: actionTypes.LOGOUT })
  }
})

const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  const [state, dispatch] = useReducer(authReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...authFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>')
  return context
}

export { AuthProvider, useAuth }
