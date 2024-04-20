import { Navbar, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import './Header.css'
import { useAuth } from '../../context/authContext'
export default function Header() {
  const { state: { user, jwt, error, loading }, login } = useAuth()
  return (
    // <header className='header'>
    //   <nav>
    //     <a href='/'>Accueil</a>
    //     <a href='/artisans'>Artisans</a>
    //     <a href='/about'>A propos</a>
    //     <a href='/services'>Services</a>
    //     <a href='/contact'>Contact</a>
    //   </nav>
    //   <a href='/authentication'><Button>Connexion</Button> </a>
    // </header>

    <Navbar shouldHideOnScroll>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='/'>
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href='/artisans' aria-current='page'>
            Artisans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='/about' href='#'>
            A propos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='/services' href='#'>
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='/contact' href='#'>
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
        { user && jwt ?
        <>
          <Button as={Link} color='primary' href='/profile' variant='flat'>
            Profil
          </Button>
           <Button className='ml-3' as={Link} color='primary' href='/authentication' variant='flat'>
           Dashboard
         </Button> 
         </> : <Button as={Link} color='primary' href='/authentication' variant='flat'>
            connexion
          </Button>}
          <Button className='ml-3' as={Link} color='primary' href='/cart' variant='flat'>
            Pannier
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
