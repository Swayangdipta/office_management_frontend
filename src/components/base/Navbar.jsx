import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { removeAuthFromSessionStorage } from '../../utils/ls.util'

const Navbar = () => {
    const {auth,setAuth} = useAuthContext()

    const hrm = () => {
        return (
            <>
                <li>
                    <Link to="/employees" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Employees</Link>
                </li>
                {/* <li>
                    <Link to="/remittances" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Remittances</Link>
                </li> */}
                <li>
                    <Link to="/reports" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Reports</Link>
                </li>
            </>
        )
    }

    const am = () => {}

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

    const signout = () => {
        const result = removeAuthFromSessionStorage()

        if(true){
            setAuth(undefined)
            return <Navigate to='/' />
        }
    }
  return (
 

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

  )
}

export default Navbar