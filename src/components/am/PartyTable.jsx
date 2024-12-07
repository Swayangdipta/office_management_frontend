import React from "react";

const PartyTable = ({ parties, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">TPN</th>
          <th className="p-2 border">Address</th>
          <th className="p-2 border">Bank</th>
          <th className="p-2 border">Account Number</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {parties.map((party) => (
          <tr key={party.id}>
            <td className="p-2 border">{party.name}</td>
            <td className="p-2 border">{party.tpn}</td>
            <td className="p-2 border">{party.address}</td>
            <td className="p-2 border">{party.bank}</td>
            <td className="p-2 border">{party.bankAccountNumber}</td>
            <td className="p-2 border">
              <button
                onClick={() => onEdit(party)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(party._id)}
                className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PartyTable;