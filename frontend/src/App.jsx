import { useEffect, useState } from 'react'
import './App.css'
import ArtisansList from './components/artisans/ArtisansList'

function App() {

  const [artisans, setArtisans] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:1337/api/artisans?populate=*');
      const data = await response.json()
      setArtisans(data.data);
    }
    getData();
  }, [])

  return (
    <>
      <ArtisansList artisans={artisans} />
    </>
  )
}

export default App
