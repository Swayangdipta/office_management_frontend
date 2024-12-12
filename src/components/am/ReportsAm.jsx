import React, { useEffect, useState } from "react";
import { getBalanceSheetReport, getLedgersReport, getProfitLossReport, getTrialBalanceReport } from "./helper/amApiCalls";
import { useAuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import * as XLSX from "xlsx";
import Navbar from "../base/Navbar";
import Sidebar from "../admin/Sidebar";

const ReportsAm = ({ type = 'eu' }) => {
  const [activeTab, setActiveTab] = useState("trialBalance");
  const [trialBalance, setTrialBalance] = useState({});
  const [profitLoss, setProfitLoss] = useState({});
  const [balanceSheet, setBalanceSheet] = useState({});
  const [ledgers, setLedgers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const { auth } = useAuthContext();
  const { token } = auth;

  const fetchReports = () => {
    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();

    getTrialBalanceReport(token, { startDate: formattedStartDate, endDate: formattedEndDate })
      .then((res) => {
        if (res.success) {
          setTrialBalance(res.data);
        } else {
          toast.error("Error fetching Trial Balance.");
        }
      })
      .catch(() => toast.error("Error fetching Trial Balance."));

    getProfitLossReport(token, { startDate: formattedStartDate, endDate: formattedEndDate })
      .then((res) => {
        if (res.success) {
          setProfitLoss(res.data);
        } else {
          toast.error("Error fetching Profit and Loss.");
        }
      })
      .catch(() => toast.error("Error fetching Profit and Loss."));

    getBalanceSheetReport(token, { startDate: formattedStartDate, endDate: formattedEndDate })
      .then((res) => {
        if (res.success) {
          setBalanceSheet(res.data);
        } else {
          toast.error("Error fetching Balance Sheet.");
        }
      })
      .catch(() => toast.error("Error fetching Balance Sheet."));

    getLedgersReport(token, { startDate: formattedStartDate, endDate: formattedEndDate })
      .then((res) => {
        if (res.success) {
          setLedgers(res.data);
        } else {
          toast.error("Error fetching Ledgers.");
        }
      })
      .catch(() => toast.error("Error fetching Ledgers."));
  };

  useEffect(() => {
    fetchReports();
  }, [startDate, endDate]);

  const handleDateChange = (type, value) => {
    if (type === "start") setStartDate(value);
    if (type === "end") setEndDate(value);
  };

  const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const renderTrialBalance = () => (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <button onClick={() => exportToExcel([trialBalance], "TrialBalanceReport")} className="bg-green-500 text-white px-4 py-2 rounded">
          Export to Excel
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">Debit Total</th>
            <th className="p-3 text-left border-b border-sky-700">Credit Total</th>
            <th className="p-3 text-left border-b border-sky-700">Is Balanced</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="p-3 border-b border-gray-200">{trialBalance.debitTotal}</td>
            <td className="p-3 border-b border-gray-200">{trialBalance.creditTotal}</td>
            <td className="p-3 border-b border-gray-200">{trialBalance.isBalanced ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderProfitLoss = () => (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <button onClick={() => exportToExcel([profitLoss], "ProfitLossReport")} className="bg-green-500 text-white px-4 py-2 rounded">
          Export to Excel
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">Revenue</th>
            <th className="p-3 text-left border-b border-sky-700">Expenses</th>
            <th className="p-3 text-left border-b border-sky-700">Profit or Loss</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="p-3 border-b border-gray-200">{profitLoss.revenue}</td>
            <td className="p-3 border-b border-gray-200">{profitLoss.expenses}</td>
            <td className="p-3 border-b border-gray-200">{profitLoss.profitOrLoss}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderBalanceSheet = () => (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <button onClick={() => exportToExcel([balanceSheet], "BalanceSheetReport")} className="bg-green-500 text-white px-4 py-2 rounded">
          Export to Excel
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">Total Assets</th>
            <th className="p-3 text-left border-b border-sky-700">Total Liabilities</th>
            <th className="p-3 text-left border-b border-sky-700">Equity</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="p-3 border-b border-gray-200">{balanceSheet.totalAssets}</td>
            <td className="p-3 border-b border-gray-200">{balanceSheet.totalLiabilities}</td>
            <td className="p-3 border-b border-gray-200">{balanceSheet.equity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderLedgers = () => (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <button onClick={() => exportToExcel(Object.entries(ledgers).flatMap(([type, entries]) => entries), "LedgersReport")} className="bg-green-500 text-white px-4 py-2 rounded">
          Export to Excel
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">Date</th>
            <th className="p-3 text-left border-b border-sky-700">Type</th>
            <th className="p-3 text-left border-b border-sky-700">Amount</th>
            <th className="p-3 text-left border-b border-sky-700">Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(ledgers).every(key => ledgers[key].length === 0) ? (
            <tr>
              <td colSpan={4} className="text-center p-4">No data available.</td>
            </tr>
          ) : (
            Object.entries(ledgers).flatMap(([ledgerType, entries]) => (
              entries.map((entry, index) => (
                <tr key={`${ledgerType}-${index}`} className="hover:bg-gray-100">
                  <td className="p-3 border-b border-gray-200">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="p-3 border-b border-gray-200 capitalize">{ledgerType}</td>
                  <td className="p-3 border-b border-gray-200">{entry.amount.toFixed(2)}</td>
                  <td className="p-3 border-b border-gray-200">{entry.description}</td>
                </tr>
              ))
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="mx-auto p-6 w-full relative top-0 min-h-screen h-max flex justify-between gap-8">
      <Navbar type={type} />

      {
            type === 'admin' && (
                <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
                    <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
                </div>
            )
      }

      <div className={`w-full ${type === 'admin' && 'p-6'}`}>
        <h2 className="text-2xl font-semibold mb-6 mt-[80px]">Reports</h2>

        {/* Date Pickers */}
        <div className="mb-4 flex items-center">
          <div className="mr-4">
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange("start", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange("end", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Tab Controls */}
        <div className="mb-4 w-screen">
          <button onClick={() => setActiveTab("trialBalance")} className={`px-4 py-2 ${activeTab === "trialBalance" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            Trial Balance
          </button>
          <button onClick={() => setActiveTab("profitLoss")} className={`px-4 py-2 mx-2 ${activeTab === "profitLoss" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            Profit and Loss
          </button>
          <button onClick={() => setActiveTab("balanceSheet")} className={`px-4 py-2 mx-2 ${activeTab === "balanceSheet" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            Balance Sheet
          </button>
          <button onClick={() => setActiveTab("ledgers")} className={`px-4 py-2 mx-2 ${activeTab === "ledgers" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            Ledgers
          </button>
        </div>

        {/* Report Renders */}
        {activeTab === "trialBalance" && renderTrialBalance()}
        {activeTab === "profitLoss" && renderProfitLoss()}
        {activeTab === "balanceSheet" && renderBalanceSheet()}
        {activeTab === "ledgers" && renderLedgers()}
      </div>
    </div>
  );
};

export default ReportsAm;