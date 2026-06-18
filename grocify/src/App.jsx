import Home from './Components/Home/Home'
import { CartProvider } from './context/CartContext'

import './App.css'

function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  )
}

export default App
