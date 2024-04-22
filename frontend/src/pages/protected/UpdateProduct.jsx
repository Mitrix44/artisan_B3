import { Button, Input, Textarea } from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { toast } from 'react-toastify'

export default function UpdateProduct () {
  const idProduct = useParams().idProduct
  const [product, setProduct] = useState({})
  const { state: { jwt } } = useAuth()
  const navigate = useNavigate()
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
        setFormData({
          name: response.data.data?.attributes?.name,
          description: response.data.data?.attributes?.description,
          price: response.data.data?.attributes?.price,
          artisan: `${response.data.data?.attributes?.artisan.data.id}`,
          picture:
            response.data.data?.attributes?.picture?.data?.map(picture => { return `${picture.id}` })
        })
      } catch (error) {
        console.error(error)
      }
    }
    getProduct()
  }, [])
  const [formData, setFormData] = useState({
    name: product?.attributes?.name,
    description: product?.attributes?.description,
    price: product?.attributes?.price,
    artisan: `${product?.attributes?.artisan.data.id}`,
    picture:
      product?.attributes?.picture?.data?.map(picture => { return `${picture.id}` })
  })
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  async function handleDeletePicture (idPicture, event) {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}upload/files/${idPicture}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (response.status === 200) {
      event.target.parentNode.remove()
      toast.success('Photo supprimée avec succès')
    }
  }
  async function handleSubmit () {
    const fileInput = document.getElementById('fileInput')
    const fileFormData = new FormData()
    Array.from(fileInput?.files).map(async function (file) {
      fileFormData.append('files', file)
    })
    const response = await axios.post(`${process.env.REACT_APP_API_URL}upload`, fileFormData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json'
        }

      })
    response.data.forEach(picture => {
      if (formData.picture[0] !== undefined) {
        formData.picture.push(`${picture.id}`)
      } else {
        console.log('Bizarre')
        formData.picture[0] = `${picture.id}`
      }
    })
    console.log(formData)
    const responseProduct = await axios.put(`${process.env.REACT_APP_API_URL}products/${idProduct}`, { data: formData }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (responseProduct.status === 200) {
      toast.success('Produit mis a jour avec succès')
      navigate('/dashboard')
    }
    console.log(responseProduct)
  }
  console.log(formData)

  return Object.keys(product).length !== 0 && (
    <div className='flex flex-col items-center'>
      <h1>Mettre a jour {product?.attributes?.name}</h1>
      <div className='flex flex-row items-center w-full'>
        <Input
          className='my-3 w-2/4 mr-é'
          label='Nom du produit'
          type='text'
          name='name'
          value={formData?.name}
          onChange={handleChange}
        />
        <Input
          className='my-3 w-2/4 ml-2'
          type='number'
          label='Price'
          name='price'
          value={formData?.price}
          onChange={handleChange}
          endContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-default-400 text-small'>€</span>
            </div>
          }
        />
      </div>
      <Textarea
        className='my-3'
        label='Description'
        name='description'
        value={formData?.description}
        onChange={handleChange}
      />
      {product?.attributes?.picture?.data?.map(picture => (
        <div className='flex flex-row w-2/4 justify-between items-center mx-auto my-3' key={picture.id}>
          <img className='h-[200px]' key={picture.id} src={`${process.env.REACT_APP_BASE_URL}${picture?.attributes?.url}`} alt={product?.attributes?.name} />
          <Button onClick={(event) => { handleDeletePicture(picture.id, event) }} color='danger'>Supprimer la photo</Button>
        </div>
      ))}
      <input id='fileInput' className='bg-slate-300 rounded w-2/4 my-3' type='file' name='files' multiple />
      <Button className='my-3' color='success' onClick={() => { handleSubmit() }}>Enregistrer</Button>

    </div>
  )
}
