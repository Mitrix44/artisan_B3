import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Artisan from '../pages/Artisan'
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import Artisans from '../pages/Artisans'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import PrivateRoutes from './PrivateRouteMiddleware'
import Dashboard from '../pages/protected/Dashboard'
import Cart from '../pages/protected/Cart'
import Profile from '../pages/protected/profile'
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='artisans'>
          <Route index element={<Artisans />} />
          <Route path=':artisanSlug' element={<Artisan />} />
        </Route>

        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='services' element={<Services />} />
        <Route path='authentication' element={<Auth />} />
        <Route path='dashboard' element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='cart' element={<PrivateRoutes />}>
          <Route index element={<Cart />} />
        </Route>
        <Route path='profile' element={<PrivateRoutes />}>
          <Route index element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
