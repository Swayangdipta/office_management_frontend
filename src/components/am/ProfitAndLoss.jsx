import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { getProfitLossReport } from './helper/amApiCalls';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const ProfitAndLoss = () => {
  const [data, setData] = useState({
    openingStock: 0,
    closingStock: 0,
    revenues: {},
    expenses: {},
    totalRevenue: 0,
    totalExpenses: 0,
    grossProfitOrLoss: 0,
    netProfitOrLoss: 0,
  });
  const [startDate, setStartDate] = useState('2021-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const { auth } = useAuthContext();
  const [error, setError] = useState('');

  const fetchProfitAndLoss = async () => {
    try {
      const response = await getProfitLossReport(auth.token, { startDate, endDate });
      console.log(response);
      
      if (response.success) {
        setData(response.data);
        setError('');
      } else {
        setError('Failed to fetch Profit and Loss Statement.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch Profit and Loss Statement.');
    }
  };

  useEffect(() => {
    fetchProfitAndLoss();
  }, []);

  const exportToExcel = () => {
    const wsData = [
      ['Company Limited'],
      ['[ Profit and Loss Statement ]'],
      [`For the Period Ending ${endDate}`],
      [],
      ['Category', 'Description', 'Amount'],
    ];

    const addCategoryData = (category, items) => {
      wsData.push([category]);
      Object.entries(items).forEach(([description, amount]) => {
        wsData.push(['', description, amount]);
      });
    };

    wsData.push(['Opening Stock', '', data.openingStock]);
    addCategoryData('Revenues', data.revenues);
    wsData.push(['Total Revenue', '', data.totalRevenue]);

    wsData.push(['Expenses']);
    addCategoryData('Expenses', data.expenses);
    wsData.push(['Total Expenses', '', data.totalExpenses]);

    wsData.push(['Closing Stock', '', data.closingStock]);
    wsData.push(['Gross Profit/Loss', '', data.grossProfitOrLoss]);
    wsData.push(['Net Profit/Loss', '', data.netProfitOrLoss]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();

    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 2 } },
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Profit and Loss');
    XLSX.writeFile(wb, 'ProfitAndLoss.xlsx');
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
        pdf.save('ProfitAndLoss.pdf');
      })
      .catch((err) => {
        console.error('Error exporting to PDF:', err);
        toast.error('Failed to export to PDF.');
      });
  };

  return (
    <div className="w-[8.3in] min-h-[11.7in] h-max p-4 border border-gray-300">
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
          onClick={fetchProfitAndLoss}
        >
          Fetch Statement
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div id="pdf-content" className="w-full border border-gray-300 p-4">
        <h1 className="text-center">Company Limited</h1>
        <h4 className="text-center mt-4 text-[24px] font-semibold">[ Profit and Loss Statement ]</h4>
        <h4 className="text-center mt-2 text-[21px] font-semibold">For the Period Ending {endDate}</h4>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Revenues Section */}
          <div>
            <h5 className="font-bold p-2 border">Revenues</h5>
            <table className="w-full bg-white border border-gray-200 mt-2">
              <tbody>
                {Object.entries(data.revenues).map(([description, amount], index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-left">{description}</td>
                    <td className="border px-4 py-2 text-right">Nu. {amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border px-4 py-2 font-semibold text-left">Total Revenue</td>
                  <td className="border px-4 py-2 text-right font-semibold">
                    Nu. {data.totalRevenue.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expenses Section */}
          <div>
            <h5 className="font-bold p-2 border">Expenses</h5>
            <table className="w-full bg-white border border-gray-200 mt-2">
              <tbody>
                {Object.entries(data.expenses).map(([description, amount], index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-left">{description}</td>
                    <td className="border px-4 py-2 text-right">Nu. {amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border px-4 py-2 font-semibold text-left">Total Expenses</td>
                  <td className="border px-4 py-2 text-right font-semibold">
                    Nu. {data.totalExpenses.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold">Opening Stock: Nu. {data.openingStock.toFixed(2)}</p>
          <p className="font-semibold">Closing Stock: Nu. {data.closingStock.toFixed(2)}</p>
          <p className="font-semibold">Gross Profit/Loss: Nu. {data.grossProfitOrLoss.toFixed(2)}</p>
          <p className="font-semibold">Net Profit/Loss: Nu. {data.netProfitOrLoss.toFixed(2)}</p>
        </div>

        <div className="flex justify-center mt-6">
          <button onClick={exportToExcel} className="px-4 py-2 bg-blue-500 text-white rounded">
            Export to Excel
          </button>
          <button onClick={exportToPDF} className="px-4 py-2 bg-green-500 text-white rounded ml-2">
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfitAndLoss;