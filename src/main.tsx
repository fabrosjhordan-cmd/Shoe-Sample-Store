import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './provider/AuthProvider.tsx'
import CartProvider from './provider/CartProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
      </Provider>
    </AuthProvider>
  </StrictMode>,
)
