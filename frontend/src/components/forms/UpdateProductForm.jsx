import { useNavigate } from 'react-router-dom'
import { Button, Input, Textarea } from '@nextui-org/react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'

export default function UpdateProductForm ({ product }) {
  const navigate = useNavigate()
  const { state: { jwt } } = useAuth()
  useEffect(() => {
    setFormData({
      name: product?.attributes?.name,
      description: product?.attributes?.description,
      price: product?.attributes?.price,
      artisan: `${product?.attributes?.artisan.data.id}`,
      picture:
            product?.attributes?.picture?.data?.map(picture => { return `${picture.id}` })
    })
  }, [])
  const [formData, setFormData] = useState({
    name: product?.attributes?.name,
    description: product?.attributes?.description,
    price: product?.attributes?.price,
    artisan: `${product?.attributes?.artisan.data.id}`,
    picture:
      product?.attributes?.picture?.data?.map(picture => { return `${picture.id}` })
  })
  const [fileFormData, setFileFormData] = useState(new FormData())
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  const handleFileChange = (event) => {
    const _fileFormData = new FormData()
    Array.from(event.target.files).forEach(file => {
      _fileFormData.append('files', file)
    })
    setFileFormData(_fileFormData)
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
      // Suppression de l'image dans formData
      setFormData({
        ...formData,
        picture: formData.picture.filter(picture => picture !== `${idPicture}`)
      })
      // Suppression de l'image dans le DOM
      event.target.parentNode.remove()
      toast.success('Photo supprimée avec succès')
    }
  }
  async function handleSubmit () {
    // Si il n'y a aucune image dans le formulaire on ajoute rien sinon on ajoute les images.
    if (!fileFormData.entries().next().done) {
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
          formData.picture[0] = `${picture.id}`
        }
      })
    }
    const responseProduct = await axios.put(`${process.env.REACT_APP_API_URL}products/${product.id}`, { data: formData }, {
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
  }
  return (
    <>
      <div className='flex flex-row items-center w-full'>
        <Input
          isRequired
          className='my-3 w-2/4 mr-é'
          label='Nom du produit'
          type='text'
          name='name'
          value={formData?.name}
          onChange={handleChange}
        />
        <Input
          isRequired
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
        isRequired
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
      <input onChange={(event) => { handleFileChange(event) }} className='bg-slate-300 rounded w-2/4 my-3' type='file' name='files' multiple />
      <Button className='my-3' onClick={() => { handleSubmit() }}>Enregistrer</Button>
    </>
  )
}
