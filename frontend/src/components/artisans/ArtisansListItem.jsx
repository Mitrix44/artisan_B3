import PropTypes from 'prop-types';

export default function ArtisansListItem({ artisan }) {
  const { name, description, picture } = artisan.attributes
  return (
    <div className="card">
      <img className="profilePicture" src={"http://localhost:1337" + picture?.data?.attributes?.formats?.thumbnail?.url} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  )
}
ArtisansListItem.propTypes = {
  artisan: PropTypes.object
}