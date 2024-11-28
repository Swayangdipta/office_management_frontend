import React, { useEffect, useState } from 'react'
import { getEmployeesHrm } from './helper/euApiCalls'
import { useAuthContext } from '../../context/AuthContext'
import Navbar from '../base/Navbar'
import DefaultTable from '../base/DefaultTable'
import toast from 'react-hot-toast'
import EmployeeManageForm from './EmployeeManageForm'

const Employees = () => {
    const {auth} = useAuthContext()
    const {endUser, token} = auth
    const [employees, setEmployees] = useState([])
    const [isFormOpen,setIsFormOpen] = useState(false)
    useEffect(() => {
        getEmployeesHrm(1,endUser._id,token).then((data) => {
            if(data.error){
                console.log(data.error);
                
                return
            }

            setEmployees(data.data)
        }).catch(error => {
            // toast.error(error)
            console.log(error);
        })
    },[])
  return (
    <div className='w-screen h-max'>
        <Navbar />

        <div className='w-full flex items-center justify-between mt-[100px] px-4'>
            <div className='px-4 py-2 w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>Employee Management</div>
            
            <div onClick={e => setIsFormOpen(true)} className='px-4 py-2 mr-4 font-bold rounded bg-sky-600 text-white cursor-pointer'>Add New +</div>
        </div>

        <div className='w-full p-4 '>
            {
                employees.length > 0 && <DefaultTable data={employees} />
            }
        </div>
        {
           isFormOpen && (<EmployeeManageForm setIsFormOpen={setIsFormOpen} />)
        }
    </div>
  )
}

export default Employees