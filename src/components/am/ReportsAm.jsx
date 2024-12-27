import React, { useEffect, useState } from "react";
import { getBalanceSheetReport, getLedgersReport, getProfitLossReport, getTrialBalanceReport } from "./helper/amApiCalls";
import { useAuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import * as XLSX from "xlsx";
import Navbar from "../base/Navbar";
import Sidebar from "../admin/Sidebar";
import TrialBalance from "./TrialBalance";
import BalanceSheet from "./BalanceSheet";
import ProfitAndLoss from "./ProfitAndLoss";

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
        console.log(res);
        
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
      <TrialBalance />
    </div>
  );

  const renderProfitLoss = () => (
    <div className="overflow-x-auto">
      <ProfitAndLoss />
    </div>
  );

  const renderBalanceSheet = () => (
    <div className="overflow-x-auto">
      <BalanceSheet />
    </div>
  );

  const renderLedgers = () => (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <button
          onClick={() =>
            exportToExcel(
              Object.entries(ledgers).flatMap(([type, entries]) => entries.map((entry) => ({ ...entry, type }))),
              "LedgersReport"
            )
          }
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
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
          {Object.values(ledgers).every((entries) => entries.length === 0) ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No data available.
              </td>
            </tr>
          ) : (
            Object.entries(ledgers).flatMap(([type, entries]) =>
              entries.map((entry, index) => (
                <tr key={`${type}-${index}`} className="hover:bg-gray-100">
                  <td className="p-3 border-b border-gray-200">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b border-gray-200 capitalize">{type}</td>
                  <td className="p-3 border-b border-gray-200">{entry.amount.toFixed(2)}</td>
                  <td className="p-3 border-b border-gray-200">{entry.description}</td>
                </tr>
              ))
            )
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
        <h2 className="text-2xl font-semibold mb-6 mt-[130px]">Reports</h2>

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