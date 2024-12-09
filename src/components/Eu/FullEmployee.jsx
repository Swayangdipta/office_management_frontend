import React, { useEffect, useState } from 'react'
import { generatePay, getPayDetails, getPaySlip, postPayBill } from './helper/euApiCalls'
import { useAuthContext } from '../../context/AuthContext'
import { IoCloseCircle } from "react-icons/io5";
import toast from 'react-hot-toast'
import PaySlip from './PaySlip';
import { usePDF } from 'react-to-pdf';
 

const PayDetails = ({employee,setIsPayDetailsOpen = f=>f}) => {
    const [payDetails, setPayDetails] = useState([])
    const [paySlip, setPaySlip] = useState(null)
    const {auth} = useAuthContext()

    const getDetails = () => {
        getPayDetails({_id: employee._id}, auth.endUser?._id, auth.token).then(data => {
            if(data.success){
                console.log(data);
                setPayDetails(data.payDetails)
                
            }else{
                toast.error("No pay records found")
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const handleDownload = (e, pay_date) => {
        e.preventDefault()

        getPaySlip({_id: employee._id,pay_date: pay_date}, auth.endUser?._id, auth.token).then(data => {
            console.log(data);

            if(data.success){
                setPaySlip(data.paySlip)
            }

            toast.error('Faild to download pay slip.')
        }).catch(error => {
            console.log(error);
        })

    }

    const handlePostpayBill = (e,pay_date) => {
        e.preventDefault()
        const data = {
            _id: employee._id,
            pay_date: pay_date
        }

        postPayBill(data,auth.endUser?._id,auth.token).then(response => {
            console.log(response)
            if(response.success){
                toast.success('Pay bill posted successfully')
                getDetails()
            }

        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(()=>{
        getDetails()
    },[])

    return(
        <div className='w-[80%] h-[80%] rounded border-2 bg-white shadow-lg absolute p-4'>
            {
                paySlip && (
                <div className='absolute bg-white top-0 left-0 w-full h-full overflow-y-scroll'>
                    <PaySlip paySlip={paySlip} setPaySlip={setPaySlip} />
                </div>
                )
            }
            <IoCloseCircle onClick={e => setIsPayDetailsOpen(false)} className='text-rose-600 cursor-pointer absolute right-[-10px] top-[-10px] text-[44px]' />
            <h4 className='underline'>Pay Details</h4>

            <div className='mt-4 overflow-y-scroll w-full h-[calc(100%_-_50px)]'>
                {
                    payDetails.length > 0 && payDetails.map((pay, index) => (
                        <div key={index} className='grid grid-cols-3 gap-2 mt-4 rounded border p-2 border-zinc-900'>
                            <div>
                                <h4 className='font-bold underline'>Pay Date</h4>
                                <h4>{pay.pay_date.slice(0,10)}</h4>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>Gross Pay</h4>
                                <h4>{pay.gross_pay}</h4>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>Net Pay</h4>
                                <h4>{pay.net_pay}</h4>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>Basic Pay</h4>
                                <h4>{pay.basic_pay}</h4>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>Allowances</h4>
                                <h4>{pay.allowances}</h4>
                            </div>

                            <div>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>GIS</h4>
                                <h4>{pay.gis}</h4>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>PF</h4>
                                <h4>{pay.pf}</h4>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>TDS</h4>
                                <h4>{pay.tds}</h4>
                            </div>

                            <div className='col-span-3 text-center my-4'>
                                <h4 className='font-bold underline'>Bank Details</h4>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>Account Holder</h4>
                                <h4>{pay.employee.fullname}</h4>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>Bank Name</h4>
                                <h4>{pay.employee.bank_name}</h4>
                            </div>

                            <div>
                                <h4 className='font-bold underline'>Bank Branch</h4>
                                <h4>{pay.employee.bank_branch}</h4>
                            </div>

                            <div className=''>
                                <h4 className='font-bold underline'>Bank Account Number</h4>
                                <h4>{pay.employee.sav_acc_num}</h4>
                            </div>

                            <div></div>
                            <div></div>
                            <div className={`p-2 rounded ${pay.status === 'Posted' ? 'bg-emerald-500': 'bg-amber-500'}`}>Status: {pay.status ? pay.status : 'Pending'}</div>
                            <div>
                                <h4 onClick={e=> handlePostpayBill(e,pay.pay_date)} className='underline text-zinc-100 cursor-pointer p-2 rounded bg-purple-600 text-center'>Post pay bill</h4>
                            </div>

                            <div>
                                <h4 onClick={e => handleDownload(e,pay.pay_date)} className='underline text-zinc-100 cursor-pointer p-2 rounded bg-sky-600 text-center'>View Pay Slip</h4>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const FullEmployee = ({employee,isFullEmployeeOpen = f => f}) => {
    const [openPayGenaration, setOpenPayGenaration] = useState(false)
    const [openPayDetails, setOpenPayDetails] = useState(false)
    const [openGenerateLPC, setOpenGenerateLPC] = useState(false)
    const [temporaries,setTemporaries] = useState({
        pay_date: '',
        lpcdate: ''
    })
    const [lpc,setLpc] = useState(null)

    const {pay_date,lpcdate} = temporaries
    const {auth} = useAuthContext()

    const handlePayGeneration = (e) => {
        e.preventDefault()
        const data = {emp_id: employee.emp_id, pay_date: pay_date}

        generatePay(data,auth.endUser?._id,auth.token).then(response => {
            console.log(response);
            
            if(response.success){
                setOpenPayGenaration(false)
                return toast.success("Pay bill generated successfully")
            }else{
                return toast.error("Something went wrong")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const handleLPCGeneration = (e) => {
        e.preventDefault()
        getPaySlip({_id: employee._id,pay_date: lpcdate}, auth.endUser?._id, auth.token).then(data => {
            console.log(data);

            if(data.success){
                // setPaySlip(data.paySlip)
                setLpc(data.paySlip)
                return
            }
            
            toast.error('Faild to generate LPC.')
        }).catch(error => {
            console.log(error);
        })
    }
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-[#00000080] flex items-center justify-center z-[3000000]'>
        <div className='w-[80%] h-[80%] rounded p-4 bg-white relative top-0'>
        <IoCloseCircle onClick={e => isFullEmployeeOpen(null)} className='text-rose-600 cursor-pointer absolute right-[-10px] top-[-10px] text-[44px]' />
            <h3>{employee.fullname}</h3>
            <h4>{employee.emp_id}</h4>
            <br />
            <div className='flex flex-wrap gap-2'>
                <div onClick={e => setOpenPayGenaration(true)} className='w-[200px] h-[100px] rounded border shadow-sm bg-zinc-600 text-white flex items-center justify-center cursor-pointer'>Pay Genaration</div>
                <div onClick={e => setOpenPayDetails(true)} className='w-[200px] h-[100px] rounded border shadow-sm bg-zinc-600 text-white flex items-center justify-center cursor-pointer'>Get Pay Details</div>
                <div onClick={e => setOpenGenerateLPC(true)} className='w-[200px] h-[100px] rounded border shadow-sm bg-zinc-600 text-white flex items-center justify-center cursor-pointer'>Generate LPC</div>
            </div>
        </div>

        {
            openPayGenaration && (
                <div className='w-[300px] h-[300px] rounded border-2 bg-white shadow-lg absolute p-2'>
                    <IoCloseCircle onClick={e => setOpenPayGenaration(false)} className='text-rose-600 cursor-pointer absolute right-[-10px] top-[-10px] text-[44px]' />
                    <h4 className='underline'>Pay Genaration</h4>
                    <form className='mt-2'>
                        <div className='flex flex-wrap gap-2'>
                            <label htmlFor="Employee_id">Employee Id</label>
                            <input className='rounded' name='Employee_id' value={employee.emp_id} type="text" disabled />
                        </div>
                        <div className='flex flex-col gap-2 mt-2'>
                            <label htmlFor="pay_date">Pay Date</label>
                            <input className='rounded' name='pay_date' value={pay_date} onChange={e => setTemporaries({...temporaries,pay_date: e.target.value})} type="date" />
                        </div>
                        <button onClick={handlePayGeneration} type="submit" className='bg-sky-600 rounded mt-4 text-white shadow-sm'>Generate</button>
                    </form>
                </div>
            )
        }

        {
            openGenerateLPC && (
                <div className='w-[300px] h-[300px] rounded border-2 bg-white shadow-lg absolute p-2'>
                    <IoCloseCircle onClick={e => setOpenGenerateLPC(false)} className='text-rose-600 cursor-pointer absolute right-[-10px] top-[-10px] text-[44px]' />
                    <h4 className='underline'>Pay Genaration</h4>
                    <form className='mt-2'>
                        <div className='flex flex-wrap gap-2'>
                            <label htmlFor="Employee_id">Employee Id</label>
                            <input className='rounded' name='Employee_id' value={employee.emp_id} type="text" disabled />
                        </div>
                        <div className='flex flex-col gap-2 mt-2'>
                            <label htmlFor="pay_date">Pay Date</label>
                            <input className='rounded' name='pay_date' value={lpcdate} onChange={e => setTemporaries({...temporaries,lpcdate: e.target.value})} type="date" />
                        </div>
                        <button onClick={handleLPCGeneration} type="submit" className='bg-sky-600 rounded mt-4 text-white shadow-sm'>Generate</button>
                    </form>
                </div>
            )
        }

        {
            openPayDetails && (
                <PayDetails setIsPayDetailsOpen={setOpenPayDetails} employee={employee} />
            )
        }
        {
            lpc && (
                <div className='w-screen h-screen fixed top-0 flex items-center justify-center'>
                    <div className='w-[80%] h-[80%] bg-white overflow-y-scroll relative top-0'>
                        <PaySlip paySlip={lpc} setPaySlip={setLpc} />
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default FullEmployee