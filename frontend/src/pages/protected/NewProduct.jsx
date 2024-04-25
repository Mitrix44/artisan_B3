import { Button, Input, Textarea } from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { toast } from 'react-toastify'

export default function NewProduct() {
  const { state: { jwt, user } } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    async function getArtisan() {
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
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  async function handleSubmit() {
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
        formData.picture[0] = `${picture.id}`
      }
    })
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
    <div className='flex flex-col items-center'>
      <h1>Nouveau produit</h1>
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
      <input id='fileInput' className='bg-slate-300 rounded w-2/4 my-3' type='file' name='files' multiple />
      <Button className='my-3' onClick={() => { handleSubmit() }}>Enregistrer</Button>

    </div>
  )
}
