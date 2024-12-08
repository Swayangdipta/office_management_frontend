import React from 'react'
import Navbar from '../base/Navbar'
import { useAuthContext } from '../../context/AuthContext'
import Card from '../base/Card'
import { MdWebAsset, MdInventory, MdBadge } from "react-icons/md";
import { FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  const {auth} = useAuthContext()
  const {admin, token} = auth

  return (
    <div className='w-screen min-h-screen h-max'>
        <Navbar type='admin' />

        <div className='px-4 py-2 mt-[100px] w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>{admin.name.toUpperCase()}</div>

        <div className='w-full h-max p-4 flex flex-wrap gap-4'>
          <Card title="End Users" Icon={FaUsers} link='/admin/end-users' />
          <Card title="Assets Category" Icon={MdWebAsset} link='/admin/asset-category' />
          <Card title="Assets Type" Icon={MdWebAsset} link='/admin/asset-type' />
          <Card title="Stocks Type" Icon={MdInventory} link='/admin/stock-type' />
          <Card title="Designations" Icon={MdBadge} link='/admin/designations' />
        </div>
    </div>
  )
}

export default AdminDashboard