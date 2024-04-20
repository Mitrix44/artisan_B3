import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/Api'
import ArtisanHeader from '../components/artisan/ArtisanHeader'
import ProductsList from '../components/products/ProductsList'

export default function Artisan() {
  const { artisanSlug } = useParams()

  const { response, error, isLoading } = useFetch(`${process.env.REACT_APP_API_URL}artisans?filters[slug][$eq]=${artisanSlug}&populate=*`)
  const { response: products, error: productsError, isLoading: productsIsLoading } = useFetch(`${process.env.REACT_APP_API_URL}products?filters[artisan][slug][$eq]=${artisanSlug}&populate=*`)

  if (isLoading || productsIsLoading) return <h1>Chargement ...</h1>

  if (error || productsError) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return response && (
    <>
      <ArtisanHeader attributes={response[0]?.attributes} />
      {products
        ? (<ProductsList products={products} />)
        : <p>Aucun produit</p>}
    </>
  )
}
