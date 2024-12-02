import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/auth/Auth.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuthContext } from './context/AuthContext.jsx'
import EuDashboard from './components/Eu/EuDashboard.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'
import { getAuthFromSessionStorage } from './utils/ls.util.js'
import Employees from './components/Eu/Employees.jsx'
import AssetCategory from './components/admin/AssetCategory.jsx'
import AssetDetails from './components/Sars/AssetDetails.jsx'
import StockDetails from './components/Sars/StockDetails.jsx'
import ReportsPage from './components/Sars/ReportsSars.jsx'
function Routing() {
  const {auth,setAuth} = useAuthContext()

  useEffect(() => {
    const authData = getAuthFromSessionStorage()

    if(authData){
      setAuth(authData)
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={auth && auth.endUser ? <EuDashboard /> : auth ? <AdminDashboard /> : <Auth type='eu' />} />
          <Route path="/admin" element={auth && auth.admin ? <AdminDashboard /> : auth ? <EuDashboard /> : <Auth type='adm' />} />
          <Route path='/employees' element={auth && auth.endUser.role === "HRM"  ? <Employees /> : <Navigate to='/' />} />
          <Route path='/sars/asset' element={auth && auth.endUser.role === "SAM" ? <AssetDetails /> : <Navigate to='/' />} />
          <Route path='/sars/stock' element={auth && auth.endUser.role === "SAM" ? <StockDetails /> : <Navigate to='/' />} />
          <Route path='/sars/reports' element={auth && auth.endUser.role === "SAM" ? <ReportsPage /> : <Navigate to='/' />} />
        </Routes>
        <Toaster         toastOptions={{
          // Apply z-index via toast options
          style: {
            zIndex: 99999999, // Set the desired z-index
          },
        }}
        containerStyle={{
          // Set container-level styles
          zIndex: 99999999, // Ensures the container stays above other elements
        }} />
      </BrowserRouter>
    </>
  )
}

export default Routing
