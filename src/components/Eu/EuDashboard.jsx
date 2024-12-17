import React from 'react'
import Navbar from '../base/Navbar'
import { useAuthContext } from '../../context/AuthContext'
import { FaUsers } from "react-icons/fa"; // Replace with the desired icon from react-icons
import { RiBillFill, RiBankLine } from "react-icons/ri";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { BiSolidReport } from "react-icons/bi";
import { MdWebAsset, MdInventory, MdBadge } from "react-icons/md";
import Card from '../base/Card'

const EuDashboard = () => {
  const  {auth} = useAuthContext()
  const {endUser} = auth

  const hrm = () => {
    return (
      <>
        <Card title="Employees" Icon={FaUsers} link='/employees' />
        <Card title="Remittances" Icon={RiBankLine} link='/remittances' />
        <Card title="Reports" Icon={BiSolidReport} link='/reports' />
      </>
    )
  }

  const am = () => {
    return(
      <>
      <Card title="Party Master" Icon={MdWebAsset} link='/am/party' />
      <Card title="Voucher" Icon={RiBankLine} link='/am/voucher' />
      <Card title="Bank Reconciliation" Icon={RiBankLine} link='/am/bank-reconsiliation' />
      <Card title="Reports" Icon={BiSolidReport} link='/am/reports' />
    </>
    )
  }

  const sam = () => {
    return (
      <>
        <Card title="Assets" Icon={MdWebAsset} link='/sars/asset' />
        <Card title="Stocks" Icon={MdInventory} link='/sars/stock' />
        <Card title="Reports" Icon={BiSolidReport} link='/sars/reports' />
      </>
    )
  }
  return (
    <div className='w-screen min-h-screen h-max'>
      <Navbar />
      <div className='px-4 py-2 mt-[150px] w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>{endUser.name.toUpperCase()}</div>

      <div className='w-full h-max p-4 flex flex-wrap gap-4'>
        {
          endUser.role === 'HRM' ? hrm() : endUser.role === 'AM' ? am() : endUser.role === 'SAM' ? sam() : null
        }
      </div>
    </div>
  )
}

export default EuDashboard