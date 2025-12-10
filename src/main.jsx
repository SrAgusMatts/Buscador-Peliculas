import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Importamos las herramientas de React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Creamos el cliente (quien maneja la caché y los datos)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos la App para que todos los componentes tengan acceso a los datos */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)