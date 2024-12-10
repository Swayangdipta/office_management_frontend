import React, { useEffect, useState } from 'react'
import Navbar from '../base/Navbar'
import AssetDetailsForm from './AssetDetailsForm'
import { getAssetsSars } from './helper/sarsApiCalls'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../context/AuthContext'
import AssetDetailsTable from './AssetDetailTable'
import Sidebar from '../admin/Sidebar'

const AssetDetails = ({type = 'eu'}) => {
    const [assets,setAssets] = useState(null)
    const {auth,token} = useAuthContext()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const getAllAssets = () => {
        getAssetsSars(auth?.endUser?._id,token).then(data => {
            console.log(data);
            
            if(data.success){
                setAssets(data.data)
                return
            }

            return toast.error('Faild to get assets')
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        getAllAssets()
    },[])
  return (
    <div className="w-screen h-max flex justify-between gap-12">
        <Navbar type={type} />

        {
            type === 'admin' && (
                <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
                    <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
                </div>
            )
        }

        <div className='w-full h-max'>
            <AssetDetailsForm assets={assets} setAssets={setAssets} />
            
            <div className='w-full p-4'>
                {
                    assets ? assets.length > 0 ? (
                        <AssetDetailsTable assets={assets} setAssets={setAssets} />
                    ) : (<p className='text-center'>No assets found</p>) : <p className='text-center'>Loading assets...</p>
                }
            </div>
        </div>
    </div>
  )
}

export default AssetDetails