import nodemailer from 'nodemailer'

let cachedTransporter = null

export function getTransporter() {
  if (cachedTransporter) return cachedTransporter

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error(
      'Email not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in server/.env (see .env.example).'
    )
  }

  cachedTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  return cachedTransporter
}

export function isMailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
}
