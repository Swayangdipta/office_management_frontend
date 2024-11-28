import { usePDF } from 'react-to-pdf';
import { IoCloseCircle } from "react-icons/io5";

const downloadPaySlip = async (paySlipData) => {
    // Render the PaySlip component as HTML string
}; 

const PaySlip = ({ paySlip, setPaySlip }) =>{ 
    const {toPDF,targetRef} = usePDF({filename: `${paySlip.employee.fullname}_${paySlip.employee.emp_id}_PaySlip`})

    const handleDownload = () => {
        toPDF()
    }

    return (
        <>
            <IoCloseCircle onClick={e => setPaySlip(false)} className='text-fuchsia-600 cursor-pointer absolute left-[10px] top-[10px] text-[44px]' />
            <div onClick={handleDownload} className='fixed top-[20px] cursor-pointer bg-sky-500 text-white rounded text-center p-2'>Download</div>
            <div className="p-6 w-full" ref={targetRef}>
            {/* Organization Name and Pay Period */}
            
            <h1 className="text-2xl font-bold text-center">ORGANIZATION NAME</h1>
            <h2 className="text-lg font-medium text-center mb-6">
                Pay Slip for {paySlip.pay_period.month} {paySlip.pay_period.year}
            </h2>
        
            {/* Employee Details Table */}
            <h3 className="text-lg font-semibold mb-2">Employee Details</h3>
            <table className="table-auto border-collapse border border-gray-400 w-full mb-6">
                <tbody>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Name</td>
                    <td className="border border-gray-300 px-4 py-2">{paySlip.employee.fullname}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Employee ID</td>
                    <td className="border border-gray-300 px-4 py-2">{paySlip.employee.emp_id}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Bank Name</td>
                    <td className="border border-gray-300 px-4 py-2">{paySlip.employee.bank_name}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Branch</td>
                    <td className="border border-gray-300 px-4 py-2">{paySlip.employee.bank_branch}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Account Number</td>
                    <td className="border border-gray-300 px-4 py-2">{paySlip.employee.sav_acc_num}</td>
                </tr>
                </tbody>
            </table>
        
            {/* Benefits Table */}
            <h3 className="text-lg font-semibold mb-2">Benefits</h3>
            <table className="table-auto border-collapse border border-gray-400 w-full mb-6">
                <tbody>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Basic Pay</td>
                    <td className="border border-gray-300 px-4 py-2">₹{paySlip.benefits.basic_pay}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Allowances</td>
                    <td className="border border-gray-300 px-4 py-2">₹{paySlip.benefits.allowances}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Total Benefits</td>
                    <td className="border border-gray-300 px-4 py-2">₹{paySlip.benefits.total}</td>
                </tr>
                </tbody>
            </table>
        
            {/* Deductions Table */}
            <h3 className="text-lg font-semibold mb-2">Deductions</h3>
            <table className="table-auto border-collapse border border-gray-400 w-full mb-6">
                <tbody>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">TDS</td>
                    <td className="border border-gray-300 px-4 py-2">₹{paySlip.deductions.tds}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">PF</td>
                    <td className="border border-gray-300 px-4 py-2">₹{paySlip.deductions.pf}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">GIS</td>
                    <td className="border border-gray-300 px-4 py-2">₹{paySlip.deductions.gis}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Total Deductions</td>
                    <td className="border border-gray-300 px-4 py-2">₹{paySlip.deductions.total}</td>
                </tr>
                </tbody>
            </table>
        
            {/* Net Salary */}
            <h3 className="text-lg font-semibold mb-2">Net Salary</h3>
            <p className="text-xl font-bold">₹{paySlip.net_salary}</p>
            </div>
        </>
  );
}

  export default PaySlip;