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
import { getFourTransactions, getFourVouchers, getTotals } from './helper/adminApiCalls';
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

  const [lastFours, setLastFours] = useState({
    vouchers: [],
    transactions: []
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
      
      if(response.error){
        return toast.error('Faild to load data. Refresh page.')
      }

      setTotals(response)
    }

    const fetchLastFours = async () => {
      const vouchers = await getFourVouchers(admin._id,token)
      const transactions = await getFourTransactions(admin._id,token)
      
      if(vouchers.error || transactions.error){
        return toast.error('Faild to load data. Refresh page.')
      }
      

      setLastFours({vouchers: vouchers.data, transactions: transactions.data})
    }

    fetchTotals()
    fetchLastFours()
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

            <div className='neumorph p-4 mt-[70px] w-full min-h-[300px] h-max rounded-[20px]'>
              <h1 className='text-[16px] text-center text-teal-500 font-semibold'>Last 4 Vouchers</h1>

              <table className="w-full divide-y divide-gray-200 mt-[20px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Narration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Transactions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lastFours.vouchers.length > 0 && lastFours.vouchers.map((voucher) => (
                    <tr key={voucher._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(voucher.entryDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {voucher.payee?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {voucher.narration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {voucher.transactions.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='neumorph p-4 mt-[50px] w-full min-h-[300px] h-max mb-[100px] rounded-[20px]'>
              <h1 className='text-[16px] text-center text-teal-500 font-semibold'>Last 4 Transactions</h1>
              
              <table className="w-full divide-y divide-gray-200 mt-[20px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Debit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reconciled
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lastFours.transactions.length > 0 && lastFours.transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-500">
                        +{transaction.credit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-500">
                        -{transaction.debit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.description}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500`}>
                        <p className={`${transaction.reconciled ? 'bg-emerald-500' : 'bg-rose-500'} w-max px-4 py-1 rounded text-zinc-50`}>
                         {transaction.reconciled ? 'Yes' : 'No'}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard