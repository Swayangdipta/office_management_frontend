import React, { useState } from 'react';
import Navbar from '../base/Navbar';
import EligibleEmployeesTable from './EligibleEmployeesTable';
import toast from 'react-hot-toast';
import { getPreviwPayGenHrm, postPayFinalization } from './helper/euApiCalls';
import { useAuthContext } from '../../context/AuthContext';

const PayGenerations = ({ type = 'eu' }) => {
  const [employees, setEmployees] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState('');
  const {auth} = useAuthContext()
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

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    console.log(`Selected month: ${e.target.value}`);
  };

  const handleProcessData = async () => {
    try {
      const id = type === 'eu' ? auth.endUser._id : auth.admin._id
      const resp = await getPreviwPayGenHrm(selectedMonth,id,auth.token)

      if(resp.success){
        setEmployees(resp.employees)
        return
      }

      return toast.error('Loading data faild!')
    } catch (error) {
      return toast.error('Faild to load preview')
    }
  }

  const handlePayFinalization = async (action) => {
    try {
      const id = type === 'eu' ? auth.endUser._id : auth.admin._id
      const resp = await postPayFinalization(action,selectedMonth,id,auth.token)

      if(resp.success){
      if(action === 'finalize'){
        toast.success('Finalization Successful')
        setEmployees(null)
        return
      }
        toast.success('Un-Finalization Successful')
        return
      }
      
      return toast.error(resp.error.response.data.error)
    } catch (error) {
      if(action === 'finalize'){
        return toast.error('Faild to finilize pay.')
      }
      return toast.error('Faild to unfinalize pay')
    }
  }
  return (
    <div className="w-screen min-h-screen h-max">
      <Navbar type={type} />

      <div className="w-full h-max mt-[150px] p-4">
        <h2 className="font-semibold text-[20px]">Finalization</h2>

        <form>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[16px]">Select Month</label>
              <select
                className="border text-[14px] border-gray-400 w-max p-2 rounded"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                <option value="" disabled>
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
          </div>
        </form>
        
        <div className='flex items-center gap-4 mt-4'>
            <button onClick={handleProcessData} className='px-4 py-2 bg-amber-500 rounded text-[12px]'>Process Data</button>
            <button onClick={e => handlePayFinalization('finalize')} className='px-4 py-2 bg-emerald-500 rounded text-[12px]'>Finalize</button>
            <button onClick={e => handlePayFinalization('unfinalize')} className='px-4 py-2 bg-rose-500 rounded text-[12px]'>UnFinalize</button>
        </div>

        {
          employees && (<EligibleEmployeesTable employees={employees} />)
        }
      </div>
    </div>
  );
};

export default PayGenerations;