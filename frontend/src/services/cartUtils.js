const addToCart = (item) => {
  // Etape 1 : Je récupère mon panier sauvegardé
  const savedCart = window.localStorage.getItem('CART')
  // Etape 2 : Je récupère le panier ou j'en créé un nouveau
  const cart = savedCart ? JSON.parse(savedCart) : []
  // Etape 3 : J'ajoute mon item
  cart.push(item)
  // Etape 4 : Je sauvegarde mon panier
  window.localStorage.setItem('CART', JSON.stringify(cart))
  // Etape 5 : J'envoi un évèvement pour avertir les autres composants
  window.dispatchEvent(new Event('storage'))
}

const deleteFromCart = (index) => {
  // Etape 1 : Je récupère mon panier sauvegardé
  const savedCart = window.localStorage.getItem('CART')
  if (savedCart) {
    const cart = JSON.parse(savedCart)
    cart.splice(index, 1)
    window.localStorage.setItem('CART', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage'))
  }
}

export {
  addToCart,
  deleteFromCart
}
