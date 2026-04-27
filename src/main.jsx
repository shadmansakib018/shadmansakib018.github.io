import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SecretPage } from './pages/SecretPage.jsx'
import { ProtectedRoute } from './pages/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/userlogin" element={<LoginPage />} />
        <Route
          path="/shadhuishu"
          element={
            <ProtectedRoute>
              <SecretPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
