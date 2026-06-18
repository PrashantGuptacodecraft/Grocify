import { useMemo, useState, useCallback } from 'react'
import { CartContext } from './cartStore'

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addToCart = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const increment = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    )
  }, [])

  const decrement = useCallback((id) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const { count, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.count += item.qty
        acc.subtotal += item.price * item.qty
        return acc
      },
      { count: 0, subtotal: 0 }
    )
  }, [items])

  const value = {
    items,
    isOpen,
    count,
    subtotal,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
