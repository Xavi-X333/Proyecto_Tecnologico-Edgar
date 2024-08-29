import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root= ReactDOM.createRoot(document.getElementById('root'))
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)