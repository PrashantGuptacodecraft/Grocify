import React, { useState } from 'react'
import { FaTimes, FaCheckCircle } from 'react-icons/fa'
import { useCart } from '../../context/cartStore'

const initialForm = { name: '', email: '', phone: '', address: '' }

const Checkout = ({ open, onClose }) => {
  const { items, subtotal, clearCart } = useCart()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errors, setErrors] = useState([])
  const [orderId, setOrderId] = useState('')

  if (!open) return null

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const close = () => {
    if (status === 'submitting') return
    setForm(initialForm)
    setStatus('idle')
    setErrors([])
    setOrderId('')
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrors([])

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            qty: item.qty,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setErrors(data.errors || ['Something went wrong. Please try again.'])
        setStatus('error')
        return
      }

      setOrderId(data.orderId)
      setStatus('success')
      clearCart()
    } catch {
      setErrors(['Could not reach the server. Make sure the backend is running.'])
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={close} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={close}
          aria-label="Close checkout"
          className="absolute top-4 right-4 text-zinc-400 hover:text-orange-500 text-2xl"
        >
          <FaTimes />
        </button>

        {status === 'success' ? (
          <div className="p-10 text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-zinc-800 mb-2">Order placed!</h2>
            <p className="text-zinc-600">
              Your order <strong>{orderId}</strong> has been received. A confirmation
              has been emailed to you.
            </p>
            <button
              onClick={close}
              className="mt-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <h2 className="text-2xl font-bold text-zinc-800 mb-1">Checkout</h2>
            <p className="text-zinc-500 mb-6">
              Total to pay:{' '}
              <span className="text-orange-500 font-bold">${subtotal.toFixed(2)}</span>
            </p>

            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="w-full border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400"
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                required
                className="w-full border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone (optional)"
                className="w-full border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400"
              />
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Delivery address"
                required
                rows={3}
                className="w-full border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting' || items.length === 0}
              className="w-full mt-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Placing order…' : `Buy Now — $${subtotal.toFixed(2)}`}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Checkout
