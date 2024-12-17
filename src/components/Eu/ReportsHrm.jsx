import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  getEmployeeMasterReport, 
  getPayGenerationReport, 
  getRemittancePostingsReport 
} from "./helper/euApiCalls"; 
import * as XLSX from "xlsx";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "../base/Navbar";
import Sidebar from "../admin/Sidebar";

const ReportsHrm = ({ type = "eu" }) => {
  const [activeTab, setActiveTab] = useState("employeeMaster");
  const [employeeMaster, setEmployeeMaster] = useState([]);
  const [payGeneration, setPayGeneration] = useState([]);
  const [remittancePostings, setRemittancePostings] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { auth } = useAuthContext();
  const { token } = auth;

  useEffect(() => {
    if (activeTab === "employeeMaster") fetchEmployeeMaster();
    if (activeTab === "payGeneration") fetchPayGeneration();
    if (activeTab === "remittancePostings") fetchRemittancePostings();
  }, [activeTab]);

  const fetchEmployeeMaster = () => {
    const id = type === "admin" ? auth.admin._id : auth.endUser._id;
    getEmployeeMasterReport(id, token)
      .then((res) => {
        if (res.success) {
          setEmployeeMaster(res.report);
        } else {
          toast.error("Error fetching Employee Master Report");
        }
      })
      .catch(() => toast.error("Error fetching Employee Master Report"));
  };

  const fetchPayGeneration = () => {
    const id = type === "admin" ? auth.admin._id : auth.endUser._id;
    getPayGenerationReport(id, token)
      .then((res) => {        
        if (res.success) {
          setPayGeneration(res.report);
        } else {
          toast.error("Error fetching Pay Generation Report");
        }
      })
      .catch(() => toast.error("Error fetching Pay Generation Report"));
  };

  const fetchRemittancePostings = () => {
    const id = type === "admin" ? auth.admin._id : auth.endUser._id;
    getRemittancePostingsReport(id, token)
      .then((res) => {
        console.log(res);
        
        if (res.success) {
          setRemittancePostings(res.report);
        } else {
          toast.error("Error fetching Remittance Postings Report");
        }
      })
      .catch(() => toast.error("Error fetching Remittance Postings Report"));
  };

  const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const renderEmployeeMaster = () => (
    <div className="overflow-x-scroll">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">ID</th>
            <th className="p-3 text-left border-b border-sky-700">Name</th>
          </tr>
        </thead>
        <tbody>
          {employeeMaster.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center p-4">
                No data available.
              </td>
            </tr>
          ) : (
            employeeMaster.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border-b border-gray-200">{row.emp_id}</td>
                <td className="p-3 border-b border-gray-200">{row.fullname}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderPayGeneration = () => (
    <div className="overflow-x-scroll">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">ID</th>
            <th className="p-3 text-left border-b border-sky-700">Employee</th>
            <th className="p-3 text-left border-b border-sky-700">Basic Pay</th>
            <th className="p-3 text-left border-b border-sky-700">Allowances</th>
            <th className="p-3 text-left border-b border-sky-700">TDS</th>
            <th className="p-3 text-left border-b border-sky-700">PF</th>
            <th className="p-3 text-left border-b border-sky-700">GIS</th>
            <th className="p-3 text-left border-b border-sky-700">Gross Pay</th>
            <th className="p-3 text-left border-b border-sky-700">Net Pay</th>
            <th className="p-3 text-left border-b border-sky-700">Pay Date</th>
            <th className="p-3 text-left border-b border-sky-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {payGeneration.length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center p-4">
                No data available.
              </td>
            </tr>
          ) : (
            payGeneration.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {/* Group Header */}
                <tr className="bg-gray-100">
                  <td colSpan={11} className="p-3 font-bold">
                    Pay Date: {group._id}
                  </td>
                </tr>
                {/* Records within the group */}
                {group.records.map((record, recordIndex) => (
                  <tr key={recordIndex} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-200">{record._id}</td>
                    <td className="p-3 border-b border-gray-200">
                      {record.employee[0]?.fullname || "N/A"}
                    </td>
                    <td className="p-3 border-b border-gray-200">{record.basic_pay}</td>
                    <td className="p-3 border-b border-gray-200">{record.allowances}</td>
                    <td className="p-3 border-b border-gray-200">{record.tds}</td>
                    <td className="p-3 border-b border-gray-200">{record.pf}</td>
                    <td className="p-3 border-b border-gray-200">{record.gis}</td>
                    <td className="p-3 border-b border-gray-200">{record.gross_pay}</td>
                    <td className="p-3 border-b border-gray-200">{record.net_pay}</td>
                    <td className="p-3 border-b border-gray-200">{new Date(record.pay_date).toLocaleDateString()}</td>
                    <td className="p-3 border-b border-gray-200">{record.status}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
  

  const renderRemittancePostings = () => (
    <div className="overflow-x-scroll">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">Date</th>
            <th className="p-3 text-left border-b border-sky-700">Employee Name</th>
            <th className="p-3 text-left border-b border-sky-700">Remittance Type</th>
            <th className="p-3 text-left border-b border-sky-700">Amount</th>
            <th className="p-3 text-left border-b border-sky-700">Remittance Date</th>
            <th className="p-3 text-left border-b border-sky-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {remittancePostings.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No data available.
              </td>
            </tr>
          ) : (
            remittancePostings.map((group, index) => (
              <React.Fragment key={index}>
                {/* Render the grouped date */}
                <tr>
                  <td colSpan={6} className="p-3 bg-gray-100 font-semibold">
                    {group._id}
                  </td>
                </tr>
                {/* Render the records under the group */}
                {group.records.map((row, subIndex) => (
                  <tr key={subIndex} className="hover:bg-gray-100">
                    <td className="p-3 border-b border-gray-200">{group._id}</td>
                    <td className="p-3 border-b border-gray-200">{row.employee.fullname || "N/A"}</td>
                    <td className="p-3 border-b border-gray-200">{row.remittance_type}</td>
                    <td className="p-3 border-b border-gray-200">{row.amount}</td>
                    <td className="p-3 border-b border-gray-200">{new Date(row.remittance_date).toLocaleDateString()}</td>
                    <td className="p-3 border-b border-gray-200">{row.status}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
  

  return (
    <div className="mx-auto p-6 w-full relative top-0 min-h-screen h-max flex justify-between gap-8">
      <Navbar type={type} />
      {type === "admin" && (
        <div className={`${isSidebarOpen ? "w-[200px]" : "w-[0px]"} h-screen duration-700`}>
          <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
        </div>
      )}
      <div className={`w-full ${type === "admin" && "p-6"}`}>
        <h2 className="text-2xl font-semibold mb-6 mt-[130px]">Reports</h2>
        <div className="mb-4">
          {["employeeMaster", "payGeneration", "remittancePostings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mx-2 ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </div>

        <button
          onClick={() => exportToExcel(
            activeTab === "employeeMaster"
              ? employeeMaster
              : activeTab === "payGeneration"
              ? payGeneration
              : remittancePostings,
            `${activeTab}_Report`
          )}
          className="bg-green-500 text-white py-2 px-4 mb-4"
        >
          Export to Excel
        </button>

        {activeTab === "employeeMaster"
          ? renderEmployeeMaster()
          : activeTab === "payGeneration"
          ? renderPayGeneration()
          : renderRemittancePostings()}
      </div>
    </div>
  );
};

export default ReportsHrm;