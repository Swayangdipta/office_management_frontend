import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const VoucherFormat = ({voucher}) => {
    const base = 8.27
    const width = base + 'in'
    const height = (base * 1.41) + 'in'
    const printDate = new Date()
    const printRef = useRef()

const numberToText = (num) => {
  if (isNaN(num)) return "Invalid number";

  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"
  ];
  const teens = [
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  const tens = [
    "", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];
  const thousands = [
    "", "Thousand", "Lakh", "Crore"
  ];

  if (num === 0) return "Zero";

  let result = "";

  const convertChunk = (number) => {
    let chunkResult = "";

    if (number > 99) {
      chunkResult += ones[Math.floor(number / 100)] + " Hundred ";
      number %= 100;
    }

    if (number > 10 && number < 20) {
      chunkResult += teens[number - 11] + " ";
    } else {
      chunkResult += tens[Math.floor(number / 10)] + " ";
      chunkResult += ones[number % 10] + " ";
    }

    return chunkResult.trim();
  };

  let i = 0;

  while (num > 0) {
    let chunk = num % 1000;

    if (chunk > 0) {
      result = convertChunk(chunk) + " " + thousands[i] + " " + result;
    }

    num = Math.floor(num / 1000);
    i++;
  }

  return result.trim();
};

const calculateTotals = (transactions) => {
  if (!Array.isArray(transactions)) {
    throw new Error("Invalid transactions data. Must be an array.");
  }

  // Calculate Debit and Credit totals
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "Debit") {
        acc.debit += transaction.amount || 0;
      } else if (transaction.type === "Credit") {
        acc.credit += transaction.amount || 0;
      }
      return acc;
    },
    { debit: 0, credit: 0 } // Initial accumulator values
  );

  return totals;
};

const handlePrint = useReactToPrint({
  conent: () => printRef.current,
  contentRef: printRef,
  documentTitle: 'Voucher Details'
})

  return (
    <div ref={printRef} style={{height: height, width: width}} className={`w-[${width}] h-[${height}] rounded bg-white  p-4 relative top-0`}>
      <p onClick={handlePrint} className='px-2 py-1 absolute text-[10px] bg-emerald-500 rounded text-white top-[0px] right-[0px] cursor-pointer'>Print</p>
        <div className={`w-full h-max rounded-t flex flex-col border-b pb-2`}>
            <h2 className='font-bold text-black text-[10px] w-full'>Print Date: {printDate.getDate() + '/' + printDate.getMonth() + '/' + printDate.getFullYear()}</h2>
        
            <div className='flex w-full justify-between mt-2 items-center'>
                <img src="https://placehold.jp/150x150.png" alt="" className='w-[150px] h-[150px] rounded-full bg-white' />

                <div className='flex flex-col items-center'>
                  <h2 className='text-black pr-8'>Company</h2>
                  <h4 className='text-black pr-8 text-[10px]'>[ {voucher.voucherType} Voucher ]</h4>
                </div>
            </div>

            <div className='flex justify-between'>
              <div></div>
              <div className='w-max text-black h-max text-[10px]'>
                <p><b>Voucher Id:</b> {voucher.voucherId}</p>
                <p><b>Voucher No:</b> {voucher.voucherNo}</p>
                <p><b>Date:</b> {voucher.entryDate.split('T')[0]}</p>
                <p><b>Type:</b> {voucher.voucherType}</p>
                <p><b>Balanced:</b> {voucher.isBalanced ? 'Yes' : 'No'}</p>
              </div>
            </div>


        </div>

        <div className='text-[10px] text-black mt-4'>
          <p><b>Payee:</b> {voucher.payee?.name}</p>
          <p className='mt-1'><b>Particulars:</b> {voucher.narration}</p>
          <p className='mt-1'><b>Transactions</b></p>
        </div>

        <table className="w-full text-[10px] text-center border text-gray-500 dark:text-gray-400 mt-2">
        <thead className="text-[10px] text-gray-700 border uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-1">Date</th>
            <th scope="col" className="py-1">Account Head Name / Type</th>
            <th scope="col" className="py-1">Debit (Rs.)</th>
            <th scope="col" className="py-1">Credit (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {voucher?.transactions && voucher.transactions?.length > 0 ? (
            voucher.transactions.map((transaction, index) => (
              <tr
                key={index}
                className={`bg-white border`}
              >
                <td className="py-1">{voucher.entryDate.split('T')[0] || '-'}</td>
                <td className="py-1">
                  {transaction.accountHead.name || '-'} / {transaction.accountHead.type || '-'}
                </td>
                <td className="py-1">
                  {transaction.type === 'Debit' ? transaction.amount : '-'}
                </td>
                <td className="py-1">
                  {transaction.type === 'Credit' ? transaction.amount : '-'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No transactions available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

        <div className='text-[10px] text-black mt-4'>
          <p><b>Passed for Rs.:</b> {calculateTotals(voucher.transactions).debit.toFixed(2) + '( Rupees ' + numberToText(calculateTotals(voucher.transactions).debit) + ' only )'}</p>
          <p><b>Net Payment Rs.:</b> {calculateTotals(voucher.transactions).credit.toFixed(2) + '( Rupees ' + numberToText(calculateTotals(voucher.transactions).credit) + ' only )'}</p>
        </div>

        <div className='text-[10px] text-black mt-4'>
          <p><b>Prepared & Approved by:</b></p>
          <p><b>Name:</b> Account Manager</p>
          <p><b>Date:</b> {voucher.entryDate.split('T')[0]}</p>
        </div>

          <div className='flex justify-between items-end'>
            <div className='text-[10px] text-black mt-4'>
              <p>Cashier</p>
              <p className=''>( Name & Date. )</p>
            </div>

            <div className='text-[10px] text-black mt-4'>
              <p>Received Payment</p>
              <p>Rs. {calculateTotals(voucher.transactions).credit.toFixed(2)}</p>
              <p className='mt-6'>Name, Signature & Date.</p>
            </div>
          </div>
    </div>
  )
}

export default VoucherFormat