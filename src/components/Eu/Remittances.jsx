import React, { useEffect, useState } from 'react'
import Navbar from '../base/Navbar'
import { getAccountingHeads, getPreviewRemittance, postRemittance, undoRemittance } from './helper/euApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Remittances = ({type = 'eu'}) => {
    const [month,setMonth] = useState('')
    const [date,setDate] = useState('')
    const [bank,setBank] = useState(false)
    const [accountHeads, setAccountHeads] = useState([]);
    const [accountHead, setAccountHead] = useState([]);
    const [signatory, setSignatory] = useState("");
    const [category, setCategory] = useState('');
    const [remittanceTo, setRemittanceTo] = useState('');
    const [remittances, setRemittances] = useState([]);
    const [previewData, setPreviewData] = useState(null);
    
    const months = [
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
    ];

    const {auth} = useAuthContext()

    const handleProcessData = async () => {
        try {
          const id = type === 'eu' ? auth.endUser._id : auth.admin._id
          const response = await getPreviewRemittance(id, {
            month,
            signatory,
            bank, // Include bank ID only for Bank
            category,
            remittanceTo,
            date
          },auth.token);
          
          if(response.details){
            setPreviewData(response); // Save preview data to state
            return
          }
    
    
          return toast.success(response?.error?.includes('404') ? 'Remittance alreday posted' : (response?.response?.data?.error || response.message));
        } catch (error) {        
          toast.error(error.response?.data?.error || "An error occurred");
        }
    }

    const handleSaveRemittance = async () => {
        try {
          const id = type === 'eu' ? auth.endUser._id : auth.admin._id
          const response = await postRemittance({
            month,
            signatory,
            bank, // Include bank ID only for Bank
            category,
            remittanceTo,
            date
          },id,auth.token);      
    
          if(response.success){
            setPreviewData(null); // Save preview data to state
            toast.success("Remittance posted successfully!")
            return
          }
    
          toast.error(response.error || response.message);
          return
        } catch (error) {
          return toast.error(error.response?.data?.error || "An error occurred");
        }
    }

    const handleUndoRemittance = async () => {
        try {
            const id = type === 'eu' ? auth.endUser._id : auth.admin._id
          const response = await undoRemittance({
            month,
            category
          },id,auth.token);
    
          if(response.success){
            setPreviewData(null); // Save preview data to state
            toast.success("Remittance undone successfully!")
            return
          }
    
          toast.error(response.error || response.message);
          return
        } catch (error) {
          return toast.error(error.response?.data?.error || "An error occurred");
        }
    }

    useEffect(()=>{
        async function getSignatories(){
            const id = type === 'eu' ? auth.endUser._id : auth.admin._id
            const resp = await getAccountingHeads(id, auth.token)
            
            
            if(resp.success){
              setAccountHeads(resp.data);
              return
            }
    
            return toast.error('Faild to load signatories')
        }
        
      getSignatories()
    },[])

  return (
    <div className='w-screen min-h-screen h-max'>
        <Navbar type={type} />

        <div className="w-full h-max mt-[150px] p-4">
            <h2 className="font-semibold text-[20px]">Remittances Posting</h2>

            <form>
                <div className="flex gap-4 mt-4 w-[500px]">
                    <label className="font-medium text-[16px] w-[200px]">Month</label>
                    <select
                        className="border text-[14px] border-gray-400 p-2 rounded w-[200px]"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <option>
                        -- Select Month --
                        </option>
                        {months.map((month, index) => (
                        <option
                            key={index}
                            value={`${new Date().getFullYear()}-${month.value}`}
                        >
                            {month.label} {new Date().getFullYear()}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4 mt-4 w-[500px]">
                    <label className="font-medium text-[16px] w-[200px]"> Signatory</label>
                    <select className="w-[200px] flex items-center rounded" value={signatory} onChange={(e) => setSignatory(e.target.value)}>
                        <option>
                            -- Select Signatories --
                        </option>
                        {accountHeads.length > 0 && accountHeads.map((head, index) => (
                        <option
                            key={index}
                            value={head._id}
                        >
                            {head.name}
                        </option>
                        ))}
                        {/* Populate with signatories dynamically */}
                    </select>
                </div>

                <div className="flex gap-4 mt-4 w-[500px]">
                    <label className="font-medium text-[16px] w-[200px]">Category</label>
                    <select
                        className="border text-[14px] border-gray-400 w-[200px] p-2 rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>
                        -- Select Category --
                        </option>
                        <option
                            value='TDS'
                        >
                            TDS
                        </option>
                        <option
                            value='GIS'
                        >
                            GIS
                        </option>
                        <option
                            value='PF'
                        >
                            PF
                        </option>
                        <option
                            value='other_deductions'
                        >
                            Others
                        </option>
                    </select>
                </div>

                <div className="flex gap-4 mt-4 w-[500px]">
                    <label className="font-medium text-[16px] w-[200px]">Remittance To</label>
                    <select
                        className="border text-[14px] border-gray-400 w-[200px] p-2 rounded"
                        value={remittanceTo}
                        onChange={(e) => setRemittanceTo(e.target.value)}
                    >
                        <option>
                        -- Remittance To --
                        </option>
                        <option
                            value='employees'
                        >
                            Employees
                        </option>
                    </select>
                </div>

                <div className="flex gap-4 mt-4 w-[500px]">
                    <label className="font-medium text-[16px] w-[200px]">Bank</label>
                    <div className='flex w-[200px] items-center'>
                        <input onClick={e => setBank(!bank)} type="radio" name="Bank" id="" /><p>Bank</p>
                    </div>
                </div>

                <div className="flex gap-4 mt-4 w-[500px] ">
                    <label className="font-medium text-[16px] w-[200px]">Date</label>
                    <input onChange={e => setDate(e.target.value)} type="date" name="date" id="" className='w-[200px] rounded' />
                </div>
            </form>

            <div className='flex items-center gap-4 mt-4'>
                <button onClick={handleProcessData} className='px-4 py-2 bg-amber-500 rounded text-[12px]'>Process Data</button>
                <button onClick={handleSaveRemittance} className='px-4 py-2 bg-emerald-500 rounded text-[12px]'>Save</button>
                <button onClick={handleUndoRemittance} className='px-4 py-2 bg-rose-500 rounded text-[12px]'>Undo Posting</button>
            </div>
        </div>

        {previewData && previewData.details && Array.isArray(previewData.details) && (
            <div className="overflow-x-auto w-full h-max p-4">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">BH</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">OBC</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Budget Line</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">DR Amount</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">CR Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {previewData.details.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{item.bh}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.obc}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.budgetLine}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{item.drAmount}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{item.crAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="3">
                                Total
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                                {previewData.totalDrAmount}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                                0
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )}
    </div>
  )
}

export default Remittances