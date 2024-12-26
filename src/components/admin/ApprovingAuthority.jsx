import React, { useEffect, useState } from 'react'
import Navbar from '../base/Navbar'
import Sidebar from './Sidebar'
import { useAuthContext } from '../../context/AuthContext'
import { createApprovingAuthority, deleteApprovingAuthority } from './helper/adminApiCalls'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'
import { Table } from 'flowbite-react'
import { getApprovingAuthorityAM } from '../am/helper/amApiCalls'

const ApprovingAuthority = ({type = 'admin'}) => {
      const {auth} = useAuthContext()
      const {admin, token} = auth
      const [isSidebarOpen,setIsSidebarOpen] = useState(true)
      const [approvingAuthorities, setApprovingAuthorities] = useState([])
      const [approvingAuthority, setApprovingAuthority] = useState({
        name: '',
        cid: '',
        email: ''
        })
    const {name, cid, email} = approvingAuthority

      const handleChange = e => {
        setApprovingAuthority({...approvingAuthority, [e.target.name]: e.target.value})
      }

      const handleSubmit = async (e) => {
        e.preventDefault()        
        try {
            const response = await createApprovingAuthority(admin._id, token, approvingAuthority)
            if(response.success){
                setApprovingAuthorities([response.data,...approvingAuthorities])
                setApprovingAuthority({
                    name: '',
                    cid: '',
                    email: ''
                })
                return toast.success('Approving Authority Created Successfully')
            }
        } catch (error) {
            console.log(error);
            return toast.error('Failed to create Approving Authority')
        }
      }

      const handleDelete = async (id) => {
        // Delete approving authority
        try{
            const response = await deleteApprovingAuthority(admin._id, token, id)
            if(response.success){
                setApprovingAuthorities(approvingAuthorities.filter(authority => authority._id !== id))
                return toast.success('Approving Authority Deleted Successfully')
            }

            return toast.error('Failed to delete Approving Authority')
        }catch (error) {
            console.log(error);
            return toast.error('Failed to delete Approving Authority')
        }
      }

      useEffect(() => {
        // Fetch approving authorities
        const fetchApprovingAuthorities = async () => {
            try {
                const response = await getApprovingAuthorityAM(admin._id, token)
                if(response.success){
                    setApprovingAuthorities(response.data)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchApprovingAuthorities()
      }, [])
  return (
    <div className="w-screen min-h-screen h-max flex gap-14">
        <Navbar type='admin' />

        <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
            <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
        </div>                  

      <div className='w-full mt-[180px]'>
        <h2 className='text-[20px] font-semibold underline mb-8'>Register Approving Authority</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
            </label>
            <input
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="cid" className="block text-sm font-medium text-gray-700">
            CID
            </label>
            <input
            type="text"
            name="cid"
            onChange={handleChange}
            value={cid}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Id
            </label>
            <input
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
        <button type="submit" color="green" className='bg-emerald-400'>
            Create Approving Authority
        </button>
        </form>

        <div className='w-full mt-8'>

            <h2 className="text-3xl font-semibold text-sky-600">Approving Authorities</h2>

            <Table hoverable={true} className='mt-10'>
            <Table.Head>
                <Table.HeadCell className='bg-black text-zinc-50'>Name</Table.HeadCell>
                <Table.HeadCell className='bg-black text-zinc-50'>CID</Table.HeadCell>
                <Table.HeadCell className='bg-black text-zinc-50'>Email Id</Table.HeadCell>
                <Table.HeadCell className='bg-rose-500 text-zinc-50'>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {approvingAuthorities.length === 0 ? (
                <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">No Approving Authority found.</td>
                </tr>
                ) : (
                approvingAuthorities.map((authority) => (
                    <Table.Row key={authority._id}>
                    <Table.Cell className='border'>{authority.name ? authority.name : 'N/A'}</Table.Cell>
                    <Table.Cell className='border'>{authority.cid ? authority.cid : 'N/A'}</Table.Cell>
                    <Table.Cell className='border'>{authority.email ? authority.email : 'N/A'}</Table.Cell>
                    <Table.Cell className='border'>
                        <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(authority._id)}
                        >
                        <FaTrash />
                        </button>
                    </Table.Cell>
                    </Table.Row>
                ))
                )}
            </Table.Body>
            </Table>
        </div>
      </div>
    </div>
  )
}

export default ApprovingAuthority