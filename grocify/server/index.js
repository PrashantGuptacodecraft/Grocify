import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { getTransporter, isMailConfigured } from './mailer.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '1mb' }))

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''))

function validateOrder(body) {
  const errors = []
  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const phone = String(body?.phone || '').trim()
  const address = String(body?.address || '').trim()
  const items = Array.isArray(body?.items) ? body.items : []

  if (name.length < 2) errors.push('A valid name is required.')
  if (!isEmail(email)) errors.push('A valid email is required.')
  if (address.length < 5) errors.push('A valid delivery address is required.')
  if (items.length === 0) errors.push('Your cart is empty.')

  const cleanItems = items.map((item) => ({
    name: String(item?.name || 'Item').slice(0, 120),
    price: Number(item?.price) || 0,
    qty: Math.max(1, Math.floor(Number(item?.qty) || 1)),
  }))

  const total = cleanItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return {
    errors,
    order: { name, email, phone, address, items: cleanItems, total },
  }
}

function buildOwnerEmail(order, orderId) {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(item.name)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.qty}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${item.price.toFixed(2)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${(item.price * item.qty).toFixed(2)}</td>
        </tr>`
    )
    .join('')

  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
    <h2 style="color:#f97316">New Grocify Order — ${escapeHtml(orderId)}</h2>
    <p><strong>Customer:</strong> ${escapeHtml(order.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(order.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(order.phone || 'N/A')}</p>
    <p><strong>Delivery address:</strong> ${escapeHtml(order.address)}</p>
    <table style="width:100%;border-collapse:collapse;margin-top:16px">
      <thead>
        <tr style="background:#fff7ed">
          <th style="padding:8px;text-align:left">Product</th>
          <th style="padding:8px;text-align:center">Qty</th>
          <th style="padding:8px;text-align:right">Price</th>
          <th style="padding:8px;text-align:right">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <h3 style="text-align:right;color:#f97316">Total: $${order.total.toFixed(2)}</h3>
  </div>`
}

function buildCustomerEmail(order, orderId) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
    <h2 style="color:#f97316">Thanks for your order, ${escapeHtml(order.name)}!</h2>
    <p>We've received your order <strong>${escapeHtml(orderId)}</strong> and will deliver it to:</p>
    <p>${escapeHtml(order.address)}</p>
    <h3 style="color:#f97316">Total: $${order.total.toFixed(2)}</h3>
    <p>— The Grocify Team</p>
  </div>`
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mailConfigured: isMailConfigured() })
})

app.post('/api/order', async (req, res) => {
  const { errors, order } = validateOrder(req.body)
  if (errors.length) {
    return res.status(400).json({ ok: false, errors })
  }

  const orderId = 'GRC-' + Date.now().toString(36).toUpperCase()

  if (!isMailConfigured()) {
    console.warn(`[order ${orderId}] received but email not configured. Order:`, order)
    return res.status(503).json({
      ok: false,
      errors: [
        'The store email is not configured yet. Add GMAIL_USER and GMAIL_APP_PASSWORD to server/.env.',
      ],
    })
  }

  try {
    const transporter = getTransporter()
    const ownerEmail = process.env.OWNER_EMAIL || process.env.GMAIL_USER

    await transporter.sendMail({
      from: `"Grocify Orders" <${process.env.GMAIL_USER}>`,
      to: ownerEmail,
      replyTo: order.email,
      subject: `New Grocify Order ${orderId} — $${order.total.toFixed(2)}`,
      html: buildOwnerEmail(order, orderId),
    })

    transporter
      .sendMail({
        from: `"Grocify" <${process.env.GMAIL_USER}>`,
        to: order.email,
        subject: `Your Grocify order ${orderId} is confirmed`,
        html: buildCustomerEmail(order, orderId),
      })
      .catch((err) => console.warn(`[order ${orderId}] customer confirmation failed:`, err.message))

    return res.json({ ok: true, orderId })
  } catch (err) {
    console.error(`[order ${orderId}] failed to send:`, err)
    return res.status(500).json({
      ok: false,
      errors: ['We could not process your order right now. Please try again later.'],
    })
  }
})

app.listen(PORT, () => {
  console.log(`Grocify API running on http://localhost:${PORT}`)
  if (!isMailConfigured()) {
    console.warn('⚠  Email not configured — orders will be rejected until server/.env is set.')
  }
})
