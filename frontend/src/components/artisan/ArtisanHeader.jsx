import PropTypes from 'prop-types'
import './artisanHeader.css'
export default function ArtisanHeader ({ attributes }) {
  const picture = 'http://localhost:1337' + attributes?.picture?.data?.attributes?.url
  return (
    <div className='artisan-header'>
      <div className='left-side'>
        <img className='artisan-picture' src={picture} />
      </div>
      <div className='right-side'>
        <h1>{attributes.name}</h1>
        <p>{attributes.description}</p>
      </div>
    </div>
  )
}

ArtisanHeader.propTypes = {
  attributes: PropTypes.object
}
