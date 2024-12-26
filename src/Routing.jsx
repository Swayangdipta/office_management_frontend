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
import AssetType from './components/admin/AssetType.jsx'
import StockType from './components/admin/StockType.jsx'
import Designations from './components/admin/Designations.jsx'
import AccountHead from './components/admin/AccountHead.jsx'
import AccountHeadManagement from './components/admin/AccountHeadManagement.jsx'
import PartyMasterPage from './components/am/PartyMasterPage.jsx'
import VoucherForm from './components/am/Voucher.jsx'
import BankReconciliation from './components/am/BankReconciliation.jsx'
import AdminEndUserManagement from './components/admin/AdminEndUserManagement.jsx'
import ReportsDashboard from './components/admin/ReportsDashboard.jsx'
import ReportsAm from './components/am/ReportsAm.jsx'
import ReportsHrm from './components/Eu/ReportsHrm.jsx'
import PayGenerations from './components/Eu/PayGenerations.jsx'
import Remittances from './components/Eu/Remittances.jsx'
import PayBillPosting from './components/Eu/PayBill.jsx'
import BankStatement from './components/am/BankStatement.jsx'
import ApprovingAuthority from './components/admin/ApprovingAuthority.jsx'
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
          <Route path="/admin/asset-category" element={auth && auth.admin ? <AssetCategory /> : auth ? <EuDashboard /> : <Auth type='adm' />} />
          <Route path="/admin/asset-type" element={auth && auth.admin ? <AssetType /> : auth ? <EuDashboard /> : <Auth type='adm' />} />
          <Route path="/admin/stock-type" element={auth && auth.admin ? <StockType /> : auth ? <EuDashboard /> : <Auth type='adm' />} />
          <Route path="/admin/designations" element={auth && auth.admin ? <Designations /> : auth ? <EuDashboard /> : <Auth type='adm' />} />
          <Route path="/admin/account-head" element={auth && auth.admin ? <AccountHeadManagement /> : auth ? <EuDashboard /> : <Auth type='adm' />} />
          <Route path="/admin/end-users" element={auth && auth.admin ? <AdminEndUserManagement /> : auth ? <EuDashboard /> : <Auth type='adm' />} />
          <Route path='/admin/employees' element={auth && auth.admin  ? <Employees type='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/asset' element={auth && auth.admin ? <AssetDetails type='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/stock' element={auth && auth.admin ? <StockDetails type='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/reports' element={auth && auth.admin ? <ReportsDashboard /> : <Navigate to='/' />} />
          <Route path='/admin/amreports' element={auth && auth.admin ? <ReportsAm type='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/samreports' element={auth && auth.admin ? <ReportsPage type='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/hrreports' element={auth && auth.admin ? <ReportsHrm type='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/party' element={auth && auth.admin ? <PartyMasterPage type='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/voucher' element={auth && auth.admin ? <VoucherForm typee='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/major' element={auth && auth.admin ? <AccountHeadManagement /> : <Navigate to='/' />} />
          <Route path='/admin/sub-major' element={auth && auth.admin ? <AccountHeadManagement modulee='sub-major' /> : <Navigate to='/' />} />
          <Route path='/admin/approving-authority' element={auth && auth.admin ? <ApprovingAuthority type='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/bank-reconsiliation' element={auth && auth.admin ? <BankReconciliation typee='admin' /> : <Navigate to='/' />} />
          <Route path='/admin/bank-statement' element={auth && auth.admin ? <BankStatement type='admin' /> : <Navigate to='/' />} />
          <Route path='/employees' element={auth && auth.endUser && auth.endUser.role === "HRM"  ? <Employees /> : <Navigate to='/' />} />
          <Route path='/pay-finalization' element={auth && auth.endUser && auth.endUser.role === "HRM"  ? <PayGenerations /> : <Navigate to='/' />} />
          <Route path='/paybill' element={auth && auth.endUser && auth.endUser.role === "HRM"  ? <PayBillPosting /> : <Navigate to='/' />} />
          <Route path='/remittance' element={auth && auth.endUser && auth.endUser.role === "HRM"  ? <Remittances /> : <Navigate to='/' />} />
          <Route path='/sars/asset' element={auth && auth.endUser && auth.endUser.role === "SAM" ? <AssetDetails /> : <Navigate to='/' />} />
          <Route path='/sars/stock' element={auth && auth.endUser && auth.endUser.role === "SAM" ? <StockDetails /> : <Navigate to='/' />} />
          <Route path='/sars/reports' element={auth && auth.endUser && auth.endUser.role === "SAM" ? <ReportsPage /> : <Navigate to='/' />} />
          <Route path='/am/party' element={auth && auth.endUser && auth.endUser.role === "AM" ? <PartyMasterPage /> : <Navigate to='/' />} />
          <Route path='/am/voucher' element={auth && auth.endUser && auth.endUser.role === "AM" ? <VoucherForm /> : <Navigate to='/' />} />
          <Route path='/am/bank-reconsiliation' element={auth && auth.endUser && auth.endUser.role === "AM" ? <BankReconciliation /> : <Navigate to='/' />} />
          <Route path='/am/bank-statement' element={auth && auth.endUser && auth.endUser.role === "AM" ? <BankStatement /> : <Navigate to='/' />} />
          <Route path='/am/reports' element={auth && auth.endUser && auth.endUser.role === "AM" ? <ReportsAm /> : <Navigate to='/' />} />
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
