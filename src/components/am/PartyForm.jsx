import React, { useState, useEffect } from "react";

const PartyForm = ({ party, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    tpn: "",
    address: "",
    bank: "",
    bankAccountNumber: "",
  });

  useEffect(() => {
    if (party) {
      setFormData(party);
    }
  }, [party]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: "", tpn: "", address: "", bank: "", bankAccountNumber: "" }); // Clear form
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Party Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <input
          type="text"
          name="tpn"
          placeholder="TPN"
          value={formData.tpn}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="bank"
          placeholder="Bank"
          value={formData.bank}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="bankAccountNumber"
          placeholder="Account Number"
          value={formData.bankAccountNumber}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        {party ? "Update Party" : "Add Party"}
      </button>
    </form>
  );
};

export default PartyForm;