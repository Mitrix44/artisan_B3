import { Card, CardBody, CardHeader } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export default function ArtisansListItem ({ artisan }) {
  const { name, description, picture, slug } = artisan.attributes
  const navigate = useNavigate()
  return (
    <div className='w-1/4 p-5'>
      <Card isPressable onClick={() => { navigate(`/artisans/${slug}`) }}>
        <CardHeader>
          <img className='w-full' src={'http://localhost:1337' + picture?.data?.attributes?.formats?.thumbnail?.url} />
        </CardHeader>
        <CardBody>
          <h3>{name}</h3>
          <p>{description}</p>
        </CardBody>
      </Card>
    </div>
  )
}
ArtisansListItem.propTypes = {
  artisan: PropTypes.object
}
