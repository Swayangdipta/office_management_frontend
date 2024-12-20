import React, { useEffect, useState } from 'react'
import { getEmployeesHrm, postRemittances } from './helper/euApiCalls'
import { useAuthContext } from '../../context/AuthContext'
import { IoCloseCircle } from "react-icons/io5";
import Navbar from '../base/Navbar'
import DefaultTable from '../base/DefaultTable'
import toast from 'react-hot-toast'
import EmployeeManageForm from './EmployeeManageForm'
import Sidebar from '../admin/Sidebar';

const Employees = ({type = 'eu'}) => {
    const {auth} = useAuthContext()
    const {endUser, token} = auth
    const [employees, setEmployees] = useState([])
    const [isFormOpen,setIsFormOpen] = useState(false)
    const [isRemitOpen,setIsRemitOpen] = useState(false)
    const [remittance,setRemittance] = useState({
        remittance_type: '',
        remittance_date: ''
    })
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const handleRemittances = e => {
        e.preventDefault()

        if(remittance.remittance_type === '' || remittance.remittance_date === '') {
            toast.error('Please fill all fields')
            return
        }

        postRemittances(remittance, endUser?._id, token).then(response => {            
            if(response.success) {
                toast.success('Remittances posted successfully')
                setIsRemitOpen(false)
                setRemittance({
                    remittance_type: '',
                    remittance_date: ''
                })
                return
            }
            const tempError = response.response.data.error || "Error while posting remittances"
            toast.error(tempError)
        }).catch(error => {
            console.log(error);
            
            const tempError = error?.response?.data.error || "Error while posting remittances"
            toast.error(tempError)
        })
    }

    useEffect(() => {
        getEmployeesHrm(1,endUser?._id,token).then((data) => {
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
    <div className='w-screen h-max justify-between flex gap-12'>
        <Navbar type={type} />

        {
            type === 'admin' && (
                <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
                    <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
                </div>
            )
        }

        <div className='w-full'>
        <div className='w-full flex items-center justify-between mt-[150px] px-4'>
            <div className='px-4 py-2 w-max bg-zinc-900 rounded m-4 text-[12px] text-zinc-100 font-bold'>Employee Management</div>
            
            <div>
                <div onClick={e => setIsFormOpen(true)} className='px-4 py-2 mr-4 font-bold rounded bg-sky-600 text-white cursor-pointer'>Add New +</div>
                <div onClick={e => setIsRemitOpen(true)} className='px-4 py-2 mr-4 font-bold rounded bg-amber-600 text-white cursor-pointer mt-2'>Post Remittances</div>
            </div>
        </div>

        <div className='w-full p-4 '>
            {
                employees.length > 0 && <DefaultTable type={type} datas={employees} />
            }
        </div>
        {
           isFormOpen && (<EmployeeManageForm setIsFormOpen={setIsFormOpen} />)
        }
        {
            isRemitOpen && (
            <div className='w-screen h-screen bg-[#00000080] fixed top-0 left-0 flex items-center justify-center'>
            <div className='w-[300px] h-[300px] rounded border-2 bg-white shadow-lg absolute p-2'>
                <IoCloseCircle onClick={e => setIsRemitOpen(false)} className='text-rose-600 cursor-pointer absolute right-[-10px] top-[-10px] text-[44px]' />
                <h4 className='underline'>Post Remittances</h4>
                <form className='mt-2'>
                    <div className='flex flex-wrap gap-2'>
                        <label htmlFor="Employee_id">Remittance Type</label>
                        <select value={remittance.remittance_type} onChange={e => setRemittance({...remittance, remittance_type: e.target.value})} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option>Select type</option>
                        <option value="TDS">TDS</option>
                        <option value="PF">PF</option>
                        <option value="GIS">GIS</option>
                    </select>
                    </div>
                    <div className='flex flex-col gap-2 mt-2'>
                        <label htmlFor="pay_date">Remittance Date</label>
                        <input className='rounded' name='pay_date' value={remittance.remittance_date} onChange={e => setRemittance({...remittance,remittance_date: e.target.value})} type="date" />
                    </div>
                    <button onClick={handleRemittances} type="submit" className='bg-sky-600 rounded mt-4 text-white shadow-sm'>Post Remittances</button>
                </form>
            </div>
            </div>
            )
        }
        </div>
    </div>
  )
}

export default Employees