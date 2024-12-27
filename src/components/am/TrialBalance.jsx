import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { getTrialBalanceReport } from './helper/amApiCalls';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const TrialBalance = () => {
  const [trialBalance, setTrialBalance] = useState([]);
  const [totals, setTotals] = useState({ totalDebit: 0, totalCredit: 0 });
  const [isBalanced, setIsBalanced] = useState(false);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('2021-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const { auth } = useAuthContext();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const date = new Date();

  const fetchTrialBalance = async () => {
    try {
      const response = await getTrialBalanceReport(auth.token, { startDate, endDate });
      const { trialBalance, totals, isBalanced } = response.data;
      setTrialBalance(trialBalance);
      setTotals(totals);
      setIsBalanced(isBalanced);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch trial balance.');
    }
  };

  useEffect(() => {
    fetchTrialBalance();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Company Limited'],
      ['[ Trial Balance ]'],
      [`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`],
      [],
      ['Account Name', 'Debit', 'Credit'],
      ...trialBalance.map(account => [
        account.accountName,
        account.debit.toFixed(2),
        account.credit.toFixed(2)
      ]),
      [],
      ['Totals', totals.totalDebit.toFixed(2), totals.totalCredit.toFixed(2)]
    ]);

    // Merge cells for the first three rows
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 2 } }
    ];

    // Define styles
    const headerStyle = {
      alignment: { horizontal: 'center', vertical: 'center' },
      font: { bold: true }, // Add bold styling for headers
      border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    const cellStyle = {
      border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    // Apply styles to cells
    ws['A1'].s = headerStyle;
    ws['A2'].s = headerStyle;
    ws['A3'].s = headerStyle;
    ws['A5'].s = headerStyle; // Apply headerStyle to 'Account Name' row

    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref]) continue;
        if (!ws[cell_ref].s) ws[cell_ref].s = {};
        ws[cell_ref].s = { ...ws[cell_ref].s, ...cellStyle };
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Trial Balance');

    try {
      XLSX.writeFile(wb, 'TrialBalance.xlsx');
      console.log('Excel file exported successfully!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const exportToPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('TrialBalance.pdf');
      })
      .catch((err) => {
        console.error('Error exporting to PDF:', err);
        toast.error('Failed to export to PDF.');
      });
  };

  return (
    <div className='w-[8.3in] min-h-[11.7in] h-max p-4 border border-gray-300'>
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          className="border rounded px-4 py-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded px-4 py-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchTrialBalance}
        >
          Fetch Trial Balance
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div id="pdf-content" className='w-[8.3in] min-h-[11.7in] h-max border border-gray-300 p-4'>
        <h1 className='text-center'>Company Limited</h1>
        <h4 className='text-center mt-4 text-[24px] font-semibold'>[ Trial Balance ]</h4>
        <h4 className='text-center mt-2 text-[21px] font-semibold'>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h4>
        <table className="w-full bg-white border border-gray-200 mt-6 p-4">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Account Name</th>
              <th className="border px-4 py-2 text-right">Debit (Nu.)</th>
              <th className="border px-4 py-2 text-right">Credit (Nu.)</th>
            </tr>
          </thead>
          <tbody>
            {trialBalance.map((account, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-left">{account.accountName}</td>
                <td className="border px-4 py-2 text-right">Nu. {account.debit.toFixed(2)}</td>
                <td className="border px-4 py-2 text-right">Nu. {account.credit.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="border px-4 py-2 font-semibold">Totals</td>
              <td className="border px-4 py-2 text-right font-semibold">Nu. {totals.totalDebit.toFixed(2)}</td>
              <td className="border px-4 py-2 text-right font-semibold">Nu. {totals.totalCredit.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <button onClick={exportToExcel} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Export to Excel
        </button>
        <button onClick={exportToPDF} className="mt-4 px-4 py-2 bg-green-500 text-white rounded ml-2">
          Export to PDF
        </button>
      </div>

      <div className="mt-4 text-lg">
        <span>
          {isBalanced ? 'The trial balance is balanced.' : 'The trial balance is not balanced.'}
        </span>
      </div>
    </div>
  );
};

export default TrialBalance;