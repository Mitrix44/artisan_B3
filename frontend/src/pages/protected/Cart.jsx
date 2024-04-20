import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { deleteFromCart } from '../../services/cartUtils'
import { useState } from 'react'

export default function Cart() {
  const savedCart = window.localStorage.getItem('CART')
  let _cart = JSON.parse(savedCart)
  const [cart, setCart] = useState(_cart)

  window.addEventListener('storage', () => {
    const savedCart = window.localStorage.getItem('CART')
    _cart = JSON.parse(savedCart)
    setCart(_cart)
  })

  const handleDelete = (index) => {
    console.log('supprimer le produit index : ' + index)
    deleteFromCart(index)
  }
  let total = 0
  if (cart) {
    total = cart.reduce((prev, item) => prev + item.attributes.price, 0)
  }
  if (cart) {
    return (
      <>
        <h1>Panier</h1>
        <Table aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>Produit</TableColumn>
            <TableColumn>Prix</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {
              cart && cart.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.attributes.name}</TableCell>
                    <TableCell>{item.attributes.price.toFixed(2)}€</TableCell>
                    <TableCell><Button onClick={() => { handleDelete(index) }} color='danger'>Supprimer</Button></TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
          <TableRow key='last'>
            <TableCell>Total</TableCell>
            <TableCell>{total.toFixed(2)}€</TableCell>
            <TableCell />
          </TableRow>
        </Table>
      </>
    )
  } else {
    return (
      <h1>Panier Vide</h1>
    )
  }
}
