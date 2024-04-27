import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import UpdateProductForm from '../../components/forms/UpdateProductForm'

export default function UpdateProduct () {
  const idProduct = useParams().idProduct
  const [product, setProduct] = useState({})
  const { state: { jwt } } = useAuth()

  useEffect(() => {
    async function getProduct () {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}products/${idProduct}?populate[0]=artisan&populate[1]=picture`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        setProduct(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    getProduct()
  }, [])

  return Object.keys(product).length !== 0 && (
    <div className='flex flex-col items-center'>
      <h1>Mettre a jour {product?.attributes?.name}</h1>
      <UpdateProductForm product={product} />

    </div>
  )
}
