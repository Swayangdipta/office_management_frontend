import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { removeAuthFromSessionStorage } from '../../utils/ls.util'
import {MdAccountBalance, MdDashboard, MdOutlineBusiness, MdOutlineSettingsApplications, MdReport} from 'react-icons/md'
import { RiAdminLine, RiTeamLine } from 'react-icons/ri'
import { FaBoxOpen, FaCubes, FaFileInvoiceDollar, FaRegChartBar, FaRegCreditCard, FaStore, FaUsers, FaUserTie, FaWarehouse } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi'

const Navbar = ({type = 'eu'}) => {
    const {auth,setAuth} = useAuthContext()

    const adm = () => {
        return (
        <>
            <li>
                <Link to="/admin" class="flex flex-col gap-1 items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white relative top-0 group">
                    <MdDashboard />
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to="/admin" class="flex flex-col gap-1 items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white relative top-0 group">
                    <RiAdminLine />
                    Admin Only

                    <div className='hidden group-hover:block duration-500 rounded p-2 absolute top-[50px] w-max bg-slate-200 h-max'>
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
                    </div>
                </Link>
            </li>
            <li>
                <Link to="/admin" class="flex flex-col gap-1 items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white relative top-0 group">
                    <FaStore />
                    Store

                    <div className='hidden group-hover:block duration-500 rounded p-2 absolute top-[50px] w-max bg-slate-200 h-max'>
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
                <Link to="/admin" class="flex flex-col gap-1 items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white relative top-0 group">
                    <RiTeamLine />
                    HR

                    <div className='hidden group-hover:block duration-500 rounded p-2 absolute top-[50px] w-max bg-slate-200 h-max'>
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
                <Link to="/admin/accounts" class="flex flex-col gap-1 items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white relative top-0 group">
                    <FaRegCreditCard />
                    Accounts

                    <div className='hidden group-hover:block duration-500 rounded p-2 absolute top-[50px] w-max bg-slate-200 h-max'>
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
                    </div>
                </Link>
            </li>

            <li>
                <Link to="/admin/reports" class="flex flex-col gap-1 items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white relative top-0 group">
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
                <Link to="/employees" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Employees</Link>
            </li>
            <li>
                <Link to="/remittances" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Remittances</Link>
            </li>
            <li>
                <Link to="/reports" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Reports</Link>
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
                <Link to="/am/party" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Party Master</Link>
            </li>
            <li>
                <Link to="/am/voucher" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Voucher</Link>
            </li>
            <li>
                <Link to="/am/bank-reconsiliation" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Bank Reconcilition</Link>
            </li>
        </>
        )
    }

    const signout = () => {
        const result = removeAuthFromSessionStorage()

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
            <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button type="button" class="flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full" src={auth.endUser.picture} alt="user photo" />
                </button>
                <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                    <div class="px-4 py-3">
                    <span class="block text-sm text-gray-900 dark:text-white">{auth.endUser.name}</span>
                    <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{auth.endUser.email}</span>
                    </div>
                    <ul class="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <Link to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                        </li>
    
                        {
                            auth.endUser.role === "HRM" ? hrm() : auth.endUser.role === "AM" ? am() : auth.endUser.role === "SAM" ? sam() : ""
                        }
    
                        <li onClick={signout}>
                            <Link href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                        </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
        </div>
        </nav>
    ) : (
        <nav class="bg-gray-50 w-full border-gray-200 dark:bg-gray-900 fixed top-0 left-0 z-[1000000]">
        <div class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/admin" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Company</span>
            </Link>

            <div className='h-full flex flex-wrap items-center justify-center gap-2'>
                {
                    adm()
                }
            </div>

            <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button type="button" class="flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full" src={auth.admin.picture} alt="user photo" />
                </button>
                <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                    <div class="px-4 py-3">
                    <span class="block text-sm text-gray-900 dark:text-white">{auth.admin.name}</span>
                    <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{auth.admin.email}</span>
                    </div>
                    <ul class="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <Link to="/admin" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                        </li>
                        
                        {
                            adm()
                        }
    
                        <li onClick={signout}>
                            <Link href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                        </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
        </div>
        </nav>
    )
  )
}

export default Navbar