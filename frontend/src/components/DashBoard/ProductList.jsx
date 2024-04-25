import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useFetch } from '../../hooks/Api'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/authContext'
import { toast } from 'react-toastify'

export default function ProductList({ artisanId }) {
  const { response: products, error: productsError, isLoading: productsIsLoading } = useFetch(`${process.env.REACT_APP_API_URL}products?filters[artisan][id][$eq]=${artisanId}&populate=*`)
  const { state: { jwt } } = useAuth()
  const navigate = useNavigate()
  const handleDelete = async (id, event) => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}products/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (response.status === 200) {
      toast.success('Produit correctement supprimé')
      event.target.parentNode.parentNode.remove()
    }
  }
  if (productsIsLoading) { return (<h2>Chargement ...</h2>) }
  if (productsError) { return (<pre>{JSON.stringify(productsError, null, 2)}</pre>) }
  if (products) {
    return (
      <Table className='my-7' aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn className='text-center'>Nom</TableColumn>
          <TableColumn className='text-center'>Prix</TableColumn>
          <TableColumn className='text-center'>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className='text-center'>
                {product.attributes.picture.data && (<img className='h-[100px] rounded-xl' src={`${process.env.REACT_APP_BASE_URL}${product?.attributes?.picture?.data[0]?.attributes?.url}`} />)}

              </TableCell>
              <TableCell>{product?.attributes?.name}</TableCell>
              <TableCell>{product?.attributes?.price} €</TableCell>
              <TableCell>
                <Button className='mr-3' color='primary' onClick={() => { navigate(`/dashboard/${product.id}`) }} variant='flat'>
                  Mettre a jour
                </Button>
                <Button color='danger' onPress={(event) => { handleDelete(product.id, event) }}>
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  } else { return (<p>Aucun produit</p>) }
}
