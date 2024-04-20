import ProductsListItem from '../components/products/ProductsListItem'
import { useFetch } from '../hooks/Api'

export default function Home() {
  const { response, isLoading, error } = useFetch(`${process.env.REACT_APP_API_URL}products?populate[0]=picture&populate[1]=artisan.picture&sort=price:asc`)
  if (isLoading) { return (<h2>Chargement ...</h2>) }
  if (error) { return (<pre>{JSON.stringify(error, null, 2)}</pre>) }

  return response && (
    <>
      <h1>Home</h1>
      <div className='d-flex flex-row flex-wrap'>
        {response.map((item, index) => (
          <ProductsListItem product={item} key={index} />
        ))}
      </div>
    </>

  )
}
