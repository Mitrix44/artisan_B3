import ArtisansList from '../components/artisans/ArtisansList'
import PropTypes from 'prop-types'
import { useFetch } from '../hooks/Api'

export default function Artisans () {
  // const [artisans, setArtisans] = useState([])
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch('http://localhost:1337/api/artisans?populate=*');
  //     const data = await response.json()
  //     setArtisans(data.data);
  //   }
  //   getData();
  // }, [])

  const { response, error, isLoading } = useFetch(`${process.env.REACT_APP_API_URL}artisans?populate=*`)
  if (isLoading) { return (<h2>Chargement ...</h2>) }
  if (error) { return (<pre>{JSON.stringify(error, null, 2)}</pre>) }
  return (
    <>
      <ArtisansList artisans={response} />
    </>
  )
}

Artisans.propTypes = {
  artisans: PropTypes.arrayOf(PropTypes.object)
}
