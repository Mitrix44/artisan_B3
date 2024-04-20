import PropTypes from 'prop-types'
import ArtisansListItem from './ArtisansListItem';
import './ArtisansList.css';
export default function ArtisansList({ artisans }) {
  if (!artisans || artisans.length < 1) {
    return 'No data';
  }
  return (
    <div className="list-container">
      <h2>Artisans List</h2>
      <div className="list">
        {
          artisans.map((artisan) => (
            <ArtisansListItem artisan={artisan} key={artisan.id} />
          ))
        }
      </div>
    </div>
  )
}

ArtisansList.propTypes = {
  artisans: PropTypes.arrayOf(PropTypes.object)
}