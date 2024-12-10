import React from 'react'
import { BiCaretLeft, BiCategory } from 'react-icons/bi'
import {MdAccountBalance, MdAttachMoney, MdDashboard, MdOutlineBusiness, MdOutlineCorporateFare, MdOutlineSettingsApplications, MdReport} from 'react-icons/md'
import { RiAdminLine, RiTeamLine } from 'react-icons/ri'
import { FaRegChartBar, FaRegCreditCard, FaStore, FaCaretLeft, FaUsers, FaCubes, FaUserTie, FaBoxOpen, FaWarehouse, FaFileInvoiceDollar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

const Sidebar = ({setIsOpen = f => f, isOpen}) => {
  return (
    <div className='relative'>
        <FaCaretLeft
            onClick={() => setIsOpen(!isOpen)}
            className={`fixed top-[55%] ${
            isOpen ? "left-[183px]" : "left-[-18px]"
            } transform -translate-y-1/2 p-4 rounded-full duration-700 bg-sky-600 text-[16px] cursor-pointer text-zinc-50`}
        />

        <div id='sidebar' className={`${isOpen ? 'w-[200px]' : 'w-[0px]'} h-[100vh] bg-zinc-100 border-r border-sky-500 fixed left-0 top-0 duration-700 overflow-y-scroll overflow-x-hidden`}>
        
        <div className={`mt-[100px] px-[20px] pb-8 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className='text-[18px]'>Admin Only</h1>
            <ul className=' mt-[10px]'>
                <li>
                    <Link to="/admin/end-users" class="flex gap-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FaUsers />
                        End User
                    </Link>
                </li>
                <li>
                    <Link to="/admin/asset-category" class="flex gap-1 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <BiCategory />
                        Asset Category
                    </Link>
                </li>
                <li>
                    <Link to="/admin/asset-type" class="flex gap-1 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <MdOutlineSettingsApplications />
                        Asset Type
                    </Link>
                </li>

                <li>
                    <Link to="/admin/stock-type" class="flex gap-1 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FaCubes />
                        Stock Type
                    </Link>
                </li>

                <li>
                    <Link to="/admin/designations" class="flex gap-1 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FaUserTie />
                        Designations
                    </Link>
                </li>

                <li>
                    <Link to="/admin/reports" class="flex gap-1 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FaRegChartBar />
                        Reports
                    </Link>
                </li>
            </ul>

            <h1 className='text-[18px] mt-[10px]'>HR Module</h1>
            <ul className=' mt-[10px]'>
                <li>
                    <Link to="/admin/employees" class="flex gap-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FaUsers />
                        Employees
                    </Link>
                </li>
            </ul>

            <h1 className='text-[18px] mt-[10px]'>Store Module</h1>
            <ul className=' mt-[10px]'>
                <li>
                    <Link to="/admin/asset" class="flex gap-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FaBoxOpen />
                        Assets
                    </Link>
                </li>
                <li>
                    <Link to="/admin/stock" class="flex gap-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FaWarehouse />
                        Stocks
                    </Link>
                </li>
            </ul>

            <h1 className='text-[18px] mt-[10px]'>Accounts Module</h1>
            <ul className=' mt-[10px]'>
                <li>
                    <Link to="/admin/party" class="flex gap-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <MdOutlineBusiness />
                        Party Master
                    </Link>
                </li>
                <li>
                    <Link to="/admin/voucher" class="flex gap-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FaFileInvoiceDollar />
                        Voucher
                    </Link>
                </li>
                <li>
                    <Link to="/admin/bank-reconsiliation" class="flex gap-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <MdAccountBalance />
                        Bank Reconciliation
                    </Link>
                </li>
            </ul>
        </div>
    </div>
    </div>
  )
}

export default Sidebar