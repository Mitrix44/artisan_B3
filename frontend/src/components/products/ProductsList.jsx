import ProductsListItem from './ProductsListItem'
import PropTypes from 'prop-types'
import './products.css'

export default function ProductsList({ products }) {
  return (
    <>
      <h1>liste des produits</h1>
      <div className='porducts-list'>
        {products.map((product) => (
          <ProductsListItem key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}
