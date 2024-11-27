import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginAdm, loginEu } from './helper/authApiCalls'
import toast from 'react-hot-toast'
import { setAuthInSessionStorage } from '../../utils/ls.util'
import { useAuthContext } from '../../context/AuthContext'

const Auth = ({type = "eu"}) => {
  const [inputs,setInputs] = useState({
    email: "",
    password: ""
  })

  const {setAuth} = useAuthContext()

  const {email,password} = inputs

  const handleSubmit = e => {
    e.preventDefault()

    let data = inputs

    if(email === "" || password === ""){
        toast.error("Please fill in all fields")
        return
    }

    if(type === "adm"){
        data = {
            name: email,
            password: password
        }
    }

    if(type === "adm"){
        loginAdm(data).then(data => {
            if(data.error){
                toast.error(data.error.error)
                return
            }

            if(setAuthInSessionStorage(data)){
                setAuth(data)
                toast.success("Logged in successfully")
                return
            }

            toast.error("Faild to login.Try again!")
        })
    }else{
        loginEu(data).then(data => {
            if(data.error){
                toast.error(data.error.error)
                return
            }

            if(setAuthInSessionStorage(data)){
                setAuth(data)
                toast.success("Logged in successfully")
                return
            }

            toast.error("Faild to login.Try again!")
        })
    }
  }
  return (
<div className='w-screen h-screen flex items-center justify-center bg-zinc-100'>
    <form className='bg-gradient-to-br from-gray-200 via-white to-gray-200 border w-[400px] h-[400px] border-sky-600 p-10 rounded-md shadow-md'>
        <h1 className='text-sky-600 underline underline-offset-8 text-[26px] font-bold text-left'>Login</h1>

        <div className="relative z-0 mt-10">
            <input
                type="text"
                id="floating_standard"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={email}
                onChange={e => setInputs({...inputs,email: e.target.value})}
            />
            <label
                htmlFor="floating_standard"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-0"
            >
                {type === 'eu' ? 'Email' : 'Username'}
            </label>
        </div>

        <div className="relative z-0 mt-10">
            <input
                type="password"
                id="floating_standard_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={password}
                onChange={e => setInputs({...inputs,password: e.target.value})}
            />
            <label
                htmlFor="floating_standard_password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-0"
            >
                Password
            </label>

            <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full mt-8">Login</button>
            <Link className='mt-8 ' to='/'>Forgot password?</Link>
        </div>
    </form>
</div>
  )
}

export default Auth