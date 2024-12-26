import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { removeAuthFromSessionStorage } from '../../utils/ls.util'
import {MdAccountBalance, MdAccountTree, MdDashboard, MdOutlineBusiness, MdOutlineSettingsApplications, MdReport} from 'react-icons/md'
import { RiAdminLine, RiTeamLine } from 'react-icons/ri'
import { FaBoxOpen, FaCubes, FaFileInvoiceDollar, FaRegChartBar, FaRegCreditCard, FaStore, FaUserCheck, FaUsers, FaUserTie, FaWarehouse } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi'

const Navbar = ({type = 'eu'}) => {
    const {auth,setAuth} = useAuthContext()

    const currentYear = new Date().getFullYear()

    const adm = () => {
        return (
        <>
            <li>
                <Link to="/admin" class="flex gap-1 items-center justify-center px-4 text-sm text-zinc-50 hover:text-zinc-100 relative top-0 group">
                    <MdDashboard />
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to="/admin/end-users" class="flex gap-1 items-center  px-1 py-2 text-sm text-gray-100 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <FaUsers />
                    End User
                </Link>
            </li>
            <li>
                <Link to="/admin/asset-category" class="flex gap-1 items-center px-1 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <BiCategory />
                    Asset Category
                </Link>
            </li>
            <li>
                <Link to="/admin/asset-type" class="flex gap-1 items-center px-1 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <MdOutlineSettingsApplications />
                    Asset Type
                </Link>
            </li>

            <li>
                <Link to="/admin/stock-type" class="flex gap-1 items-center px-1 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <FaCubes />
                    Stock Type
                </Link>
            </li>

            <li>
                <Link to="/admin/designations" class="flex gap-1 items-center px-1 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <FaUserTie />
                    Designations
                </Link>
            </li>

            <li>
                <Link to="/admin/major" class="flex gap-1 items-center px-1 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <MdAccountTree />
                    Major Accounts Head
                </Link>
            </li>

            <li>
                <Link to="/admin/sub-major" class="flex gap-1 items-center px-1 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <MdAccountTree />
                    Sub-Major Accounts Head
                </Link>
            </li>

            <li>
                <Link to="/admin/reports" class="flex gap-1 items-center px-1 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <FaRegChartBar />
                    Reports
                </Link>
            </li>
        </>
        )
    }

    const agencyAdm = () => {
        return (
            <>
                <li>
                <Link to="/admin" class="flex gap-1 items-center justify-center px-4 text-sm text-zinc-50 hover:text-zinc-100 relative top-0 group">
                    <FaStore />
                    Store

                    <div className='hidden group-hover:block duration-500 rounded p-2 absolute top-[20px] w-max bg-slate-200 h-max'>
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
                    </div>
                </Link>
            </li>

            <li>
                <Link to="/admin" class="flex gap-1 items-center justify-center px-4 text-sm text-zinc-50 hover:text-zinc-100 relative top-0 group">
                    <RiTeamLine />
                    HR

                    <div className='hidden group-hover:block duration-500 rounded p-2 absolute top-[20px] w-max bg-slate-200 h-max'>
                        <li>
                            <Link to="/admin/employees" class="flex gap-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                <FaUsers />
                                Employees
                            </Link>
                        </li>
                    </div>
                </Link>
            </li>

            <li>
                <Link to="/admin" class="flex gap-1 items-center justify-center px-4 text-sm text-zinc-50 hover:text-zinc-100 relative top-0 group">
                    <FaRegCreditCard />
                    Accounts

                    <div className='hidden group-hover:block duration-500 rounded p-2 absolute top-[20px] w-max bg-slate-200 h-max'>
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

                        <li>
                            <Link to="/admin/bank-statement" class="flex gap-1 items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                <MdAccountBalance />
                                Bank Statement
                            </Link>
                        </li>
                    </div>
                </Link>
            </li>

            <li>
                <Link to="/admin/approving-authority" class="flex gap-1 items-center justify-center px-4 text-sm text-zinc-50 hover:text-zinc-100 relative top-0 group">
                    <FaUserCheck />
                    Approving Authority
                </Link>
            </li>

            <li>
                <Link to="/admin/reports" class="flex gap-1 items-center justify-center px-4 text-sm text-zinc-50 hover:text-zinc-100 relative top-0 group">
                    <FaRegChartBar />
                    Reports
                </Link>
            </li>
            </>
        )
    }

    const hrm = () => {
        return (
        <>
            <li>
                <Link to="/employees" class="block px-4 py-2 text-sm text-zinc-50">Employee Master</Link>
            </li>
            <li>
                <Link to='/pay-finalization' class="block px-4 py-2 text-sm text-zinc-50">Pay Finalization</Link>
            </li>
            <li>
                <Link to='/paybill' class="block px-4 py-2 text-sm text-zinc-50">Paybill Posting</Link>
            </li>
            <li>
                <Link to='/remittance' class="block px-4 py-2 text-sm text-zinc-50">Remittances Posting</Link>
            </li>
            <li>
                <Link class="block px-4 py-2 text-sm text-zinc-50">Payslip</Link>
            </li>
            <li>
                <Link class="block px-4 py-2 text-sm text-zinc-50">LPC</Link>
            </li>
        </>
        )
    }

    const sam = () => {
        return (
        <>
            <li>
                <Link to="/sars/asset" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Assets</Link>
            </li>
            <li>
                <Link to="/sars/stock" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Stocks</Link>
            </li>
            <li>
                <Link to="/sars/reports" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Reports</Link>
            </li>
        </>
        )
    }

    const am = () => {
        return (
        <>
            <li>
                <Link to="/am/party" class="block px-4 py-2 text-sm text-zinc-50">Party Master</Link>
            </li>
            <li>
                <Link to="/am/voucher" class="block px-4 py-2 text-sm text-zinc-50">Voucher</Link>
            </li>
            <li>
                <Link to="/am/bank-reconsiliation" class="block px-4 py-2 text-sm text-zinc-50">Bank Reconcilition</Link>
            </li>
        </>
        )
    }

    const signout = () => {
        removeAuthFromSessionStorage()
        
        if(true){
            setAuth(undefined)
            return <Navigate to='/' />
        }
    }
  return (
    type === "eu" ? (
        <nav class="bg-gray-50 w-full border-gray-200 dark:bg-gray-900 fixed top-0 left-0 z-[1000000]">
        <div class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Company</span>
            </Link>

            <div className='flex flex-col'>
                <h4 className='text-emerald-600 text-[10px]'><b>Welcome</b> {auth.endUser.name}</h4>
                <h4 className='text-emerald-600 text-[10px]'><b>Fiscal Year:  {currentYear} - {currentYear + 1}</b></h4>
                <h4 className='text-emerald-600 text-[10px] mt-2'><b>c-OMPANY Client support (DPA)</b></h4>
                <h4 className='text-emerald-600 text-[10px]'><b>Tele:  91 0253</b></h4>
            </div>
        </div>

        <div className='w-full bg-emerald-600 h-max flex items-center gap-2 text-zinc-50 py-1'>
                {
                    auth.endUser.role === 'HRM' ? hrm() : auth.endUser.role === 'SAM' ? sam() : auth.endUser.role === 'AM' ? am() : 'Not a valid role'
                }

            <li>
                <Link class="block px-4 py-2 text-sm text-zinc-50" onClick={signout}>Logout</Link>
            </li>
        </div>
        </nav>
    ) : (
        <nav class="bg-gray-50 w-full border-gray-200 dark:bg-gray-900 fixed top-0 left-0 z-[1000000]">
        <div class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/admin" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Company</span>
            </Link>

            <div className='flex flex-col'>
                <h4 className='text-emerald-600 text-[10px]'><b>Welcome</b> {auth.admin.name}</h4>
                <h4 className='text-emerald-600 text-[10px]'><b>Fiscal Year:  {currentYear} - {currentYear + 1}</b></h4>
                <h4 className='text-emerald-600 text-[10px] mt-2'><b>c-OMPANY Client support (DPA)</b></h4>
                <h4 className='text-emerald-600 text-[10px]'><b>Tele:  91 0253</b></h4>
            </div>
        </div>

        <div className='w-full bg-emerald-600 h-max flex items-center gap-2 text-zinc-50 py-1'>
            {
                auth.admin.role === 'agency_adm' ? agencyAdm() : auth.admin.role === 'admin' ? adm() : 'Not a valid role'
            }

            <li>
                <Link class="block px-4 py-2 text-sm text-zinc-50" onClick={signout}>Logout</Link>
            </li>
        </div>
        </nav>
    )
  )
}

export default Navbar