import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import { NavBar } from './components/shared/NavBar'
import PreRegister from './layouts/preregister'

// Set baseURL for API calls
console.log('🔧 VITE_API_URL:', import.meta.env.VITE_API_URL)
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <div className="mw-1280">
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pre-register" element={<PreRegister key="open" />} />
      </Routes>
    </BrowserRouter>
  </div>
)
