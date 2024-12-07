// src/pages/VoucherPreparation.jsx
import React, { useState } from "react";
import DisbursementForm from "./DisbursementForm";
import JournalForm from "./JournalForm";
import OtherForm from "./OtherForm";
import VouchersTable from "./VoucherTable";

const VoucherPreparation = () => {
  const [voucherType, setVoucherType] = useState("disbursement");

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Voucher Preparation</h1>
      <div className="mb-4">
        <label htmlFor="voucherType" className="block text-sm font-medium text-gray-700">
          Select Voucher Type
        </label>
        <select
          id="voucherType"
          value={voucherType}
          onChange={(e) => setVoucherType(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="disbursement">Disbursement</option>
          <option value="journal">Journal</option>
          <option value="others">Others</option>
        </select>
      </div>
      {voucherType === "disbursement" && <DisbursementForm />}
      {voucherType === "journal" && <JournalForm />}
      {voucherType === "others" && <OtherForm />}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Vouchers</h2>
        <VouchersTable />
      </div>
    </div>
  );
};

export default VoucherPreparation;