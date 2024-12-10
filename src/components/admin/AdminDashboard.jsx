import React, { useEffect, useState } from 'react'
import Navbar from '../base/Navbar'
import { useAuthContext } from '../../context/AuthContext'
import Card from '../base/Card'
import { MdWebAsset, MdInventory, MdBadge } from "react-icons/md";
import { FaUsers } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';
import { BiSolidReport } from 'react-icons/bi';
import Sidebar from './Sidebar';
import StatCard from './StatCard';
import { getTotals } from './helper/adminApiCalls';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const {auth} = useAuthContext()
  const {admin, token} = auth
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [totals, setTotals] = useState({
    employees: 0,
    endUsers: 0,
    assetDetails: 0,
    stockDetails: 0,
    vouchers: 0,
    bankReconciliations: 0,
  })

  const {employees, endUsers, assetDetails, stockDetails, vouchers, bankReconciliations} = totals

  const hrm = () => {
    return (
      <>
        <Card title="Employees" Icon={FaUsers} link='/admin/employees' />
        <Card title="Remittances" Icon={RiBankLine} link='/admin/remittances' />
        <Card title="Reports" Icon={BiSolidReport} link='/admin/reports' />
      </>
    )
  }

  const am = () => {
    return(
      <>
      <Card title="Party Master" Icon={MdWebAsset} link='/admin/party' />
      <Card title="Voucher" Icon={RiBankLine} link='/admin/voucher' />
      <Card title="Bank Reconciliation" Icon={RiBankLine} link='/admin/bank-reconsiliation' />
      <Card title="Reports" Icon={BiSolidReport} link='/admin/reports' />
    </>
    )
  }

  const sam = () => {
    return (
      <>
        <Card title="Assets" Icon={MdWebAsset} link='/admin/asset' />
        <Card title="Stocks" Icon={MdInventory} link='/admin/stock' />
        <Card title="Reports" Icon={BiSolidReport} link='/admin/reports' />
      </>
    )
  }

  useEffect(()=>{
    const fetchTotals = async () => {
      const response = await getTotals(admin._id,token)

      console.log(response);
      
      if(response.error){
        return toast.error('Faild to load data. Refresh page.')
      }

      setTotals(response)
    }

    fetchTotals()
  },[])

  return (
    <div className='w-screen min-h-screen h-max flex gap-8'>
        <Navbar type='admin' />

        <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
          <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
        </div>

        <div className='w-full px-10'>
          <div className='px-4 py-2 mt-[100px] w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>{admin.name.toUpperCase()}</div>
            <div className='mt-[40px] flex flex-wrap gap-10'>
              <StatCard total={endUsers} title='End Users' color='text-emerald-500' />
              <StatCard total={employees} title='Employees' />
              <StatCard total={assetDetails} title='Assets' color='text-amber-500' />
              <StatCard total={stockDetails} title='Stocks' color='text-violet-500' />
              <StatCard total={vouchers} title="Voucher's" color='text-teal-500' />
              <StatCard total={bankReconciliations} title="Transaction's" color='text-cyan-500' />
            </div>

            <div className='neumorph mt-[70px] w-full h-[300px] mb-[100px] rounded-[50px] flex items-center justify-center'>
              Currently Under Development. Coming soon....
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard