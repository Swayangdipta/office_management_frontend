import React from 'react'
import Navbar from '../base/Navbar'
import { useAuthContext } from '../../context/AuthContext'
import Card from '../base/Card'
import { MdWebAsset, MdInventory, MdBadge } from "react-icons/md";
import { FaUsers } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';
import { BiSolidReport } from 'react-icons/bi';

const AdminDashboard = () => {
  const {auth} = useAuthContext()
  const {admin, token} = auth

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

  return (
    <div className='w-screen min-h-screen h-max'>
        <Navbar type='admin' />

        <div className='px-4 py-2 mt-[100px] w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>{admin.name.toUpperCase()}</div>

        <div className='px-4 py-2 w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>Admin</div>
        <div className='w-full h-max p-4 flex flex-wrap gap-4 relative top-0'>
          <Card title="End Users" Icon={FaUsers} link='/admin/end-users' />
          <Card title="Assets Category" Icon={MdWebAsset} link='/admin/asset-category' />
          <Card title="Assets Type" Icon={MdWebAsset} link='/admin/asset-type' />
          <Card title="Stocks Type" Icon={MdInventory} link='/admin/stock-type' />
          <Card title="Designations" Icon={MdBadge} link='/admin/designations' />
        </div>

        <div className='px-4 py-2 w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>HR Manager</div>
        <div className='w-full h-max p-4 flex flex-wrap gap-4 relative top-0'>
          {hrm()}
        </div>

        <div className='px-4 py-2 w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>Store Manager</div>
        <div className='w-full h-max p-4 flex flex-wrap gap-4 relative top-0'>
          {sam()}
        </div>

        <div className='px-4 py-2 w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>Accounts Manager</div>
        <div className='w-full h-max p-4 flex flex-wrap gap-4 relative top-0'>
          {am()}
        </div>
    </div>
  )
}

export default AdminDashboard