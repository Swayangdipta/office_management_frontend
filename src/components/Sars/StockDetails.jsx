import React, { useEffect, useState } from 'react'
import Navbar from '../base/Navbar'
import { getStocksSars } from './helper/sarsApiCalls'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../context/AuthContext'
import StockDetailsForm from './StockDetailsForm'
import StockDetailsTable from './StockDetailTable'

const StockDetails = ({type = 'eu'}) => {
    const [assets,setAssets] = useState(null)
    const {auth,token} = useAuthContext()

    const getAllAssets = () => {
        getStocksSars(auth.endUser?._id,token).then(data => {
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
    <>
        <Navbar type={type} />

        <div className='w-screen h-max min-h-screen'>
            <StockDetailsForm assets={assets} setAssets={setAssets} />
            
            <div className='w-full p-4'>
                {
                    assets ? assets.length > 0 ? (
                        <StockDetailsTable assets={assets} setAssets={setAssets} />
                    ) : (<p className='text-center'>No assets found</p>) : <p className='text-center'>Loading assets...</p>
                }
            </div>
        </div>
    </>
  )
}

export default StockDetails