import { Button } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { addToCart } from '../../services/cartUtils'
export default function ProductsListItem ({ product }) {
  return (
    <div className='product-card'>
      <div className='intern-product-card'>
        {product.attributes.picture.data && (<img className='product-img' src={'http://localhost:1337' + product?.attributes?.picture?.data[0]?.attributes?.formats?.thumbnail?.url} />)}
        <h3>{product.attributes.name}</h3>
        <span>{product.attributes.price} €</span>
        {product.attributes.artisan.data.attributes.picture && (

          <div className='w-full flex flex-row justify-end h-10'>
            <a className='w-1/5' href={'artisans/' + product?.attributes?.artisan?.data?.attributes?.slug}><img className='w-full rounded-full' src={'http://localhost:1337' + product?.attributes?.artisan?.data?.attributes?.picture?.data?.attributes?.url} /></a>
          </div>
        )}
        <Button className='m-3' color='primary' onClick={() => addToCart(product)}>Ajouter au panier</Button>
      </div>
    </div>
  )
}
ProductsListItem.propTypes = {
  product: PropTypes.object
}
