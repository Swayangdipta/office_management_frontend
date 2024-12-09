// src/components/VoucherPreparation/DisbursementForm.jsx
import React, { useState } from "react";
import { createVoucher } from "./helper/amApiCalls";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const DisbursementForm = () => {
  const [rows, setRows] = useState([{ account: "", debit: 0, credit: 0 }]);
  const [description, setDescription] = useState("");
  const [voucherDate, setVoucherDate] = useState("");

  const {auth} = useAuthContext()
  const {endUser,token} = auth

  const handleAddRow = () => {
    setRows([...rows, { account: "", debit: 0, credit: 0 }]);
  };

  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    setRows(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalDebit = rows.reduce((sum, row) => sum + Number(row.debit), 0);
    const totalCredit = rows.reduce((sum, row) => sum + Number(row.credit), 0);

    if (totalDebit !== totalCredit) {
      toast.error("Debit and Credit amounts must be equal!");
      return;
    }

    const voucherData = { voucherDate, description, rows, type: "disbursement" };
    try {
      const response = await createVoucher(endUser?._id,token,voucherData);
      toast.success("Voucher created successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error creating voucher:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Voucher Date</label>
        <input
          type="date"
          value={voucherDate}
          onChange={(e) => setVoucherDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Account</th>
              <th className="px-4 py-2">Debit</th>
              <th className="px-4 py-2">Credit</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.account}
                    onChange={(e) => handleInputChange(index, "account", e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.debit}
                    onChange={(e) => handleInputChange(index, "debit", e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.credit}
                    onChange={(e) => handleInputChange(index, "credit", e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={handleAddRow}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Row
        </button>
      </div>
      <button
        type="submit"
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default DisbursementForm;