import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { getBalanceSheetReport } from './helper/amApiCalls';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const BalanceSheet = () => {
  const [data, setData] = useState({
    assets: {},
    liabilities: {},
    totals: { totalAssets: 0, totalLiabilities: 0 },
  });
  const [startDate, setStartDate] = useState('2021-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const { auth } = useAuthContext();
  const [error, setError] = useState('');

  const fetchBalanceSheet = async () => {
    try {
      const response = await getBalanceSheetReport(auth.token, { startDate, endDate });
      const { assets, liabilities, totals } = response.data;
      setData({ assets, liabilities, totals });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch balance sheet.');
    }
  };

  useEffect(() => {
    fetchBalanceSheet();
  }, []);

  const exportToExcel = () => {
    const wsData = [
      ['Company Limited'],
      ['[ Balance Sheet ]'],
      [`As of ${endDate}`],
      [],
      ['Category', 'Description', 'Amount'],
    ];
    
    const addCategoryData = (category, items) => {
      wsData.push([category]);
      Object.entries(items).forEach(([description, amount]) => {
        wsData.push(['', description, amount]);
      });
    };

    addCategoryData('Assets', data.assets);
    addCategoryData('Liabilities', data.liabilities);

    wsData.push([]);
    wsData.push(['Totals', 'Assets', data.totals.totalAssets]);
    wsData.push(['', 'Liabilities', data.totals.totalLiabilities]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();

        // Merge cells for the first three rows
    ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } },
        { s: { r: 2, c: 0 }, e: { r: 2, c: 2 } }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, 'Balance Sheet');
    XLSX.writeFile(wb, 'BalanceSheet.xlsx');
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
        pdf.save('BalanceSheet.pdf');
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
          onClick={fetchBalanceSheet}
        >
          Fetch Balance Sheet
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div id="pdf-content" className="w-full border border-gray-300 p-4">
        <h1 className="text-center">Company Limited</h1>
        <h4 className="text-center mt-4 text-[24px] font-semibold">[ Balance Sheet ]</h4>
        <h4 className="text-center mt-2 text-[21px] font-semibold">As of {endDate}</h4>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Liabilities Section */}
          <div>
            <h5 className="font-bold flex items-center justify-between p-2 border ">
                <span>Liabilities</span>
                <span>Amt.</span>
            </h5>
            <table className="w-full bg-white border border-gray-200 mt-2">
              <tbody>
                {Object.entries(data.liabilities).map(([description, amount], index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-left">{description}</td>
                    <td className="border px-4 py-2 text-right">Nu. {amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border px-4 py-2 font-semibold text-left">Total Liabilities</td>
                  <td className="border px-4 py-2 text-right font-semibold">
                    Nu. {data.totals.totalLiabilities.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Assets Section */}
          <div>
          <h5 className="font-bold flex items-center justify-between p-2 border">
                <span>Assets</span>
                <span>Amt.</span>
            </h5>
            <table className="w-full bg-white border border-gray-200 mt-2">
              <tbody>
                {Object.entries(data.assets).map(([description, amount], index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-left">{description}</td>
                    <td className="border px-4 py-2 text-right">Nu. {amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border px-4 py-2 font-semibold text-left">Total Assets</td>
                  <td className="border px-4 py-2 text-right font-semibold">
                    Nu. {data.totals.totalAssets.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

export default BalanceSheet;