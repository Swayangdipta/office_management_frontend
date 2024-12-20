import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../base/Navbar";
import { getAccountingHeads, getBanks, getPreviewBill, postPayBill, undoPayBill } from "./helper/euApiCalls";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const PayBillPosting = ({type = "eu"}) => {
  const [accountHeads, setAccountHeads] = useState([]);
  const [banks, setBanks] = useState([]);
  const [month, setMonth] = useState("");
  const [bankOrCash, setBankOrCash] = useState("Cash"); // Default to "Cash"
  const [bank, setBank] = useState("");
  const [voucherDate, setVoucherDate] = useState("");
  const [signatory, setSignatory] = useState("");
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
      const response = await getPreviewBill(id, {
        month,
        bankOrCash,
        bank: bankOrCash === "Bank" ? bank : null, // Include bank ID only for Bank
        voucher_date: voucherDate,
        signatory,
      },auth.token);
      

      if(response.success){
        setPreviewData(response); // Save preview data to state
        return
      }


      return toast.error(response?.error?.includes('404') ? 'Paybill alreday posted' : (response?.response?.data?.error || response.message));
    } catch (error) {        
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const handleSaveBill = async () => {
    try {
        const id = type === 'eu' ? auth.endUser._id : auth.admin._id
      const response = await postPayBill({
        month,
        bankOrCash,
        bank: bankOrCash === "Bank" ? bank : null, // Include bank ID only for Bank
        voucher_date: voucherDate,
        signatory,
      },id,auth.token);      

      if(response.success){
        setPreviewData(null); // Save preview data to state
        toast.success("Pay bills posted successfully!")
        return
      }

      toast.error(response.error || response.message);
      return
    } catch (error) {
      return toast.error(error.response?.data?.error || "An error occurred");
    }
  }

  const handleUndoBill = async () => {
    try {
        const id = type === 'eu' ? auth.endUser._id : auth.admin._id
      const response = await undoPayBill({
        month,
        bankOrCash,
        bank: bankOrCash === "Bank" ? bank : null, // Include bank ID only for Bank
        voucher_date: voucherDate,
        signatory,
      },id,auth.token);

      console.log(response);
      

      if(response.success){
        setPreviewData(null); // Save preview data to state
        toast.success("Pay bills undone successfully!")
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

      async function getBanksData(){
          const id = type === 'eu' ? auth.endUser._id : auth.admin._id
          const resp = await getBanks(id, auth.token)
          console.log(resp);
          
          if(!resp.error){
            setBanks(resp);
            return
          }
  
          return toast.error('Faild to load signatories')
      }
      
    getSignatories()
    getBanksData()
  },[])

  return (
    <div className="w-screen min-h-screen h-max">
        <Navbar type={type} />
      <h2 className="mt-[150px] text-[18px] font-semibold px-4">Pay Bill Posting</h2>

      <form className="mt-8 px-4">
        <div className="w-[500px] flex items-center mt-4">
            <label className="w-[200px] flex items-center ">Select Month:</label>
            <select className="w-[200px] flex items-center rounded" value={month} onChange={(e) => setMonth(e.target.value)}>
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
        <div className="w-[500px] flex items-center mt-4">
            <label className="w-[200px] flex items-center">Bank or Cash:</label>
            <input
            type="radio"
            value="Bank"
            checked={bankOrCash === "Bank"}
            onChange={() => setBankOrCash("Bank")}
            />
            Bank
            <input
            className="ml-2"
            type="radio"
            value="Cash"
            checked={bankOrCash === "Cash"}
            onChange={() => setBankOrCash("Cash")}
            />
            Cash
        </div>
        {bankOrCash === "Bank" && (
            <div className="w-[500px] flex items-center mt-4">
            <label className="w-[200px] flex items-center">Select Bank:</label>
            <select className="w-[200px] flex items-center rounded" value={bank} onChange={(e) => setBank(e.target.value)}>
            <option>
                    -- Select Bank --
                </option>
                {banks.length > 0 && banks.map((bnk, index) => (
                  <option
                    key={index}
                    value={bnk._id}
                  >
                    {bnk.name + ' ' + bnk.account_num}
                  </option>
                ))}
            </select>
            </div>
        )}
        <div className="w-[500px] flex items-center mt-4">
            <label className="w-[200px] flex items-center">Voucher Date:</label>
            <input className="w-[200px] flex items-center rounded"
            type="date"
            value={voucherDate}
            onChange={(e) => setVoucherDate(e.target.value)}
            />
        </div>
        <div className="w-[500px] flex items-center mt-4">
            <label className="w-[200px] flex items-center">Signatory:</label>
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
      </form>

      <div className='flex items-center gap-4 mt-4 px-4'>
        <button onClick={handleProcessData} className='px-4 py-2 bg-amber-500 rounded text-[12px]'>Process Data</button>
        <button onClick={handleSaveBill} className='px-4 py-2 bg-emerald-500 rounded text-[12px]'>Save</button>
        <button onClick={handleUndoBill} className='px-4 py-2 bg-rose-500 rounded text-[12px]'>Undo Posting</button>
      </div>

      {previewData && (
        <div className="w-full h-max p-4 mt-4">
          <h3 className="text-[18px] font-semibold underline">Preview</h3>
          <div>
            <p className="text-[18px] font-semibold">Total Gross Pay: {previewData.totals.totalGrossPay.toFixed(2)}</p>
            <p className="text-[18px] font-semibold">Total Recoveries: {previewData.totals.totalRecoveries}</p>
            <p className="text-[18px] font-semibold">Net Payment: {previewData.totals.totalNetPayment}</p>
          </div>
          <h4 className="text-[18px] font-semibold underline mt-4">Details</h4>
          <table className="table-auto border-collapse border border-gray-300 w-full text-left mt-4 p-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Employee Name</th>
                <th className="border border-gray-300 px-4 py-2">Gross Pay</th>
                <th className="border border-gray-300 px-4 py-2">Recoveries</th>
                <th className="border border-gray-300 px-4 py-2">Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {previewData.payDetails.map((payGen) => (
                <tr key={payGen._id}>
                  <td className="border border-gray-300 px-4 py-2">{payGen.employeeName}</td>
                  <td className="border border-gray-300 px-4 py-2">{payGen.grossPay.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {payGen.totalDeductions.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{payGen.netPay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PayBillPosting;