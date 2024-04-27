import { Button, Input, Textarea } from '@nextui-org/react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function NewProductForm () {
  const { state: { jwt, user } } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    async function getArtisan () {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}users/${user.id}?populate=artisan`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        setFormData({
          ...formData,
          artisan: `${response.data.artisan.id}`
        }
        )
      } catch (error) {
        console.error(error)
      }
    }
    getArtisan()
  }, [])
  const [formData, setFormData] = useState({
    name: 'Nom du Produit',
    description: 'Description du produit',
    price: 0,
    artisan: 0,
    picture: []
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
    const responseProduct = await axios.post(`${process.env.REACT_APP_API_URL}products`, { data: formData }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (responseProduct.status === 200) {
      toast.success('Produit ajouté avec succès')
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
      <input onChange={(event) => { handleFileChange(event) }} className='bg-slate-300 rounded w-2/4 my-3' type='file' name='files' multiple />
      <Button className='my-3' onClick={() => { handleSubmit() }}>Enregistrer</Button>
    </>

  )
}
