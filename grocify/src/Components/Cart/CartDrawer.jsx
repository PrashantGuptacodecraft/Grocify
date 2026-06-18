import React from 'react'
import { FaPlus, FaMinus, FaTrash, FaTimes } from 'react-icons/fa'
import { HiMiniShoppingBag } from 'react-icons/hi2'
import { useCart } from '../../context/cartStore'

const CartDrawer = ({ onCheckout }) => {
  const {
    items,
    isOpen,
    subtotal,
    count,
    closeCart,
    increment,
    decrement,
    removeFromCart,
  } = useCart()

  const handleCheckout = () => {
    closeCart()
    onCheckout()
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HiMiniShoppingBag className="text-orange-500" /> Your Cart
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-zinc-500 hover:text-orange-500 text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 gap-3">
              <HiMiniShoppingBag className="text-6xl" />
              <p className="text-lg">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 bg-zinc-50 p-3 rounded-xl border border-zinc-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-zinc-800">{item.name}</h3>
                    <p className="text-orange-500 font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => decrement(item.id)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="font-bold w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => increment(item.id)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-zinc-800">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="text-zinc-400 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-zinc-100 px-6 py-5 space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-zinc-600">Subtotal ({count} items)</span>
              <span className="font-bold text-zinc-900">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

export default CartDrawer
