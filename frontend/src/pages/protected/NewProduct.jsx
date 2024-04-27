import NewProductForm from '../../components/forms/NewProductForm'

export default function NewProduct () {
  return (
    <div className='flex flex-col items-center'>
      <h1>Nouveau produit</h1>
      <NewProductForm />
    </div>
  )
}
