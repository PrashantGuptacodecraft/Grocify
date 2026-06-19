# Grocify — Full-Stack Grocery Store

A React + Vite + Tailwind storefront with a working cart, checkout, and an
Express backend that **emails you every order** via Gmail.

## Features

- Browse products with real prices
- Add to cart, adjust quantities, remove items (slide-in cart drawer)
- Checkout form (name, email, phone, delivery address)
- **Buy Now** → backend validates the order and emails it to you, plus sends
  the customer a confirmation email
- Working "Shop Now" / "See All" navigation and newsletter signup

## Tech

- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Express + Nodemailer (Gmail)

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure email (so orders reach your inbox)

The store emails orders using your Gmail account and a **Google App Password**
(not your normal password).

1. Enable **2-Step Verification** on your Google account:
   https://myaccount.google.com/security
2. Create an **App Password**: https://myaccount.google.com/apppasswords
   (choose "Mail" / "Other") — you'll get a 16-character code.
3. Copy the example env file and fill it in:

   ```bash
   cp server/.env.example server/.env
   ```

   Then edit `server/.env`:

   ```
   GMAIL_USER=youraddress@gmail.com
   GMAIL_APP_PASSWORD=your16charapppassword
   OWNER_EMAIL=youraddress@gmail.com
   PORT=5000
   ```

> `server/.env` is gitignored — your password is never committed.

### 3. Run (frontend + backend together)

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Vite proxies `/api/*` to the backend automatically.

You can also run them separately: `npm run dev:client` and `npm run server`.

---

## How the buy flow works

1. Customer adds products and opens the cart.
2. On checkout they submit their details.
3. Frontend `POST /api/order` → backend validates input and recomputes the total
   server-side.
4. Backend emails the full order to `OWNER_EMAIL` and a confirmation to the
   customer, then returns an order ID.

If email isn't configured yet, the API returns a clear message and the order is
logged to the server console instead.

## Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `npm run dev`        | Run frontend + backend together  |
| `npm run dev:client` | Frontend only                    |
| `npm run server`     | Backend only                     |
| `npm run build`      | Production build of the frontend |
| `npm run lint`       | Lint the project                 |
| `npm run preview`    | Preview the production build     |

---

## Contact / About

For questions or collaboration, reach out to the project owner:

- Email: prashant983869@gmail.com
- Phone: 9838693305
