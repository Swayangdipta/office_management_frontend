import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../base/Navbar";
import toast from "react-hot-toast";
import { getBankTransactions } from "./helper/amApiCalls";
import { useAuthContext } from "../../context/AuthContext";
import Sidebar from "../admin/Sidebar";

const BankStatement = ({type = 'eu'}) => {
  const [transactions, setTransactions] = useState([]);
  const [encashmentDates, setEncashmentDates] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const {auth} = useAuthContext()

  // Fetch bank transactions from the backend
  const fetchBankStatements = async () => {
    try {
        const id = type === 'eu' ? auth.endUser._id : auth.admin._id
      const response = await getBankTransactions(id, auth.token) // Replace with your API endpoint

      console.log(response);
      
      if (response.success) {
        setTransactions(response.data);
      } else {
        toast.error(response.data.error || "Failed to fetch data");
      }
    } catch (error) {
      toast.error("Error fetching bank statement");
    }
  };

  // Handle Encashment Date changes
  const handleEncashmentDateChange = (id, date) => {
    setEncashmentDates((prev) => ({
      ...prev,
      [id]: date,
    }));
  };

  useEffect(() => {
    fetchBankStatements();
  }, []);

  return (
    <div className="w-screen min-h-screen h-max flex justify-between gap-12">
      <Navbar type="type" />

        {
            type === 'admin' && (
                <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
                    <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
                </div>
            )
        }
      <div className="w-full h-max mt-[150px] p-4">
        <h2 className="font-semibold text-[20px]">Bank Statement</h2>

        <div className="overflow-x-auto w-full h-max p-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Vr ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Voucher Date</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Encashment Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{transaction.voucher?.voucherId || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {transaction.credit > 0 ? transaction.credit : transaction.debit}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="date"
                      value={encashmentDates[transaction._id] || ""}
                      onChange={(e) =>
                        handleEncashmentDateChange(transaction._id, e.target.value)
                      }
                      className="border border-gray-400 p-2 rounded w-[150px]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BankStatement;