import React, { useEffect, useState } from "react";
import { getAssetCategoriesSars, getAssetDetailsSars, getStockTypeesSars, getStockDetailsSars } from "./helper/sarsApiCalls";
import { useAuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import * as XLSX from "xlsx"; // Import xlsx library
import Navbar from "../base/Navbar";
import Sidebar from "../admin/Sidebar";

const ReportsPage = ({type = 'eu'}) => {
  const [activeTab, setActiveTab] = useState("assetCategories");
  const [assetCategories, setAssetCategories] = useState([]);
  const [assetDetails, setAssetDetails] = useState([]);
  const [stockTypes, setStockTypes] = useState([]);
  const [stockDetails, setStockDetails] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const { auth } = useAuthContext();
  const { token } = auth;

  const fetchReports = () => {
    // Fetch Asset Categories
    getAssetCategoriesSars(auth.endUser?._id, token)
      .then((res) => {
        if (res.success) {
          setAssetCategories(res.data);
        } else {
          toast.error('Something went wrong while fetching asset categories');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error fetching asset categories');
      });

    // Fetch Asset Details
    getAssetDetailsSars(auth.endUser?._id, token)
      .then((res) => {
        if (res.success) {
          setAssetDetails(res.data);
        } else {
          toast.error('Something went wrong while fetching asset details');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error fetching asset details');
      });

    // Fetch Stock Types
    getStockTypeesSars(auth.endUser?._id, token)
      .then((res) => {
        if (res.success) {
          setStockTypes(res.data);
        } else {
          toast.error('Something went wrong while fetching stock types');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error fetching stock types');
      });

    // Fetch Stock Details
    getStockDetailsSars(auth.endUser?._id, token)
      .then((res) => {
        
        if (res.success) {
          setStockDetails(res.data);
        } else {
          toast.error('Something went wrong while fetching stock details');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error fetching stock details');
      });
  };

  useEffect(() => {
    fetchReports();
  }, []); // Run once on mount

  // Function to export data to Excel
  const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  // Render tables differently based on the type of data
  const renderAssetCategoriesTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">ID</th>
            <th className="p-3 text-left border-b border-sky-700">Name</th>
            <th className="p-3 text-left border-b border-sky-700">Depretiation</th>
          </tr>
        </thead>
        <tbody>
          {assetCategories.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No data available.
              </td>
            </tr>
          ) : (
            assetCategories.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border-b border-gray-200">{row._id}</td>
                <td className="p-3 border-b border-gray-200">{row.name}</td>
                <td className="p-3 border-b border-gray-200">{row.depreciationRate}%</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderAssetDetailsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">ID</th>
            <th className="p-3 text-left border-b border-sky-700">Type</th>
            <th className="p-3 text-left border-b border-sky-700">Registration ID</th>
            <th className="p-3 text-left border-b border-sky-700">Purchase Date</th>
            <th className="p-3 text-left border-b border-sky-700">Model</th>
            <th className="p-3 text-left border-b border-sky-700">Value</th>
          </tr>
        </thead>
        <tbody>
          {assetDetails.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No data available.
              </td>
            </tr>
          ) : (
            assetDetails.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border-b border-gray-200">{row._id}</td>
                <td className="p-3 border-b border-gray-200">{row.assetType.name}</td>
                <td className="p-3 border-b border-gray-200">{row.registrationId}</td>
                <td className="p-3 border-b border-gray-200">{row.purchaseDate}</td>
                <td className="p-3 border-b border-gray-200">{row.model}</td>
                <td className="p-3 border-b border-gray-200">{row.purchaseValue}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderStockTypesTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">ID</th>
            <th className="p-3 text-left border-b border-sky-700">Type</th>
            <th className="p-3 text-left border-b border-sky-700">Description</th>
          </tr>
        </thead>
        <tbody>
          {stockTypes.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No data available.
              </td>
            </tr>
          ) : (
            stockTypes.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border-b border-gray-200">{row._id}</td>
                <td className="p-3 border-b border-gray-200">{row.name}</td>
                <td className="p-3 border-b border-gray-200">{row.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderStockDetailsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3 text-left border-b border-sky-700">ID</th>
            <th className="p-3 text-left border-b border-sky-700">Type</th>
            <th className="p-3 text-left border-b border-sky-700">Registration ID</th>
            <th className="p-3 text-left border-b border-sky-700">Purchase Date</th>
            <th className="p-3 text-left border-b border-sky-700">Model</th>
            <th className="p-3 text-left border-b border-sky-700">Value</th>
          </tr>
        </thead>
        <tbody>
          {stockDetails.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No data available.
              </td>
            </tr>
          ) : (
            stockDetails.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border-b border-gray-200">{row._id}</td>
                <td className="p-3 border-b border-gray-200">{row.stockType.name}</td>
                <td className="p-3 border-b border-gray-200">{row.registrationId}</td>
                <td className="p-3 border-b border-gray-200">{row.purchaseDate}</td>
                <td className="p-3 border-b border-gray-200">{row.model}</td>
                <td className="p-3 border-b border-gray-200">{row.purchaseValue}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="mx-auto p-6 w-full relative top-0 left-0 min-h-screen h-max flex justify-between gap-8">
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
        <div className="mb-4 w-screen">
          <button
            onClick={() => setActiveTab("assetCategories")}
            className={`px-4 py-2 ${activeTab === "assetCategories" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Asset Categories
          </button>
          <button
            onClick={() => setActiveTab("assetDetails")}
            className={`px-4 py-2 mx-2 ${activeTab === "assetDetails" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Asset Details
          </button>
          <button
            onClick={() => setActiveTab("stockTypes")}
            className={`px-4 py-2 mx-2 ${activeTab === "stockTypes" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Stock Types
          </button>
          <button
            onClick={() => setActiveTab("stockDetails")}
            className={`px-4 py-2 mx-2 ${activeTab === "stockDetails" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Stock Details
          </button>
        </div>

        <div>
          {activeTab === "assetCategories" && (
            <>
              <button
                onClick={() => exportToExcel(assetCategories, "Asset_Categories")}
                className="bg-green-500 text-white py-2 px-4 mb-4 rounded"
              >
                Export to Excel
              </button>
              {renderAssetCategoriesTable()}
            </>
          )}
          {activeTab === "assetDetails" && (
            <>
              <button
                onClick={() => exportToExcel(assetDetails, "Asset_Details")}
                className="bg-green-500 text-white py-2 px-4 mb-4"
              >
                Export to Excel
              </button>
              {renderAssetDetailsTable()}
            </>
          )}
          {activeTab === "stockTypes" && (
            <>
              <button
                onClick={() => exportToExcel(stockTypes, "Stock_Types")}
                className="bg-green-500 text-white py-2 px-4 mb-4"
              >
                Export to Excel
              </button>
              {renderStockTypesTable()}
            </>
          )}
          {activeTab === "stockDetails" && (
            <>
              <button
                onClick={() => exportToExcel(stockDetails, "Stock_Details")}
                className="bg-green-500 text-white py-2 px-4 mb-4"
              >
                Export to Excel
              </button>
              {renderStockDetailsTable()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;