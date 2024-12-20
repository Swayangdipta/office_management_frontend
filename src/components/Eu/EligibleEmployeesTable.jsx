import React, { useEffect } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css"; // Import the DataTable CSS for styling

const EligibleEmployeesTable = ({ employees = [] }) => {
  useEffect(() => {
    const tableElement = document.getElementById("eligible-employees-table");
    if (tableElement) {
      new DataTable(tableElement, {
        searchable: false,
        perPageSelect: false,
        paging: true,
        perPage: 15,
        sortable: false,
      });
    }
  }, []);

  return (
    <div className="overflow-hidden">
      <table
        id="eligible-employees-table"
        className="table-auto border-collapse border border-gray-300 w-full text-left"
      >
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">SL No#</th>
            <th className="border border-gray-300 px-4 py-2">Emp. ID</th>
            <th className="border border-gray-300 px-4 py-2">CID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Designation</th>
            <th className="border border-gray-300 px-4 py-2">Basic Pay</th>
            <th className="border border-gray-300 px-4 py-2">Total Allowances</th>
            <th className="border border-gray-300 px-4 py-2">Gross Pay</th>
            <th className="border border-gray-300 px-4 py-2">Total Deductions</th>
            <th className="border border-gray-300 px-4 py-2">Net Pay</th>
            <th className="border border-gray-300 px-4 py-2">View Details</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <tr key={employee.emp_id}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>

                <td className="border border-gray-300 px-4 py-2">
                  {employee.emp_id}
                </td>

                <td className="border border-gray-300 px-4 py-2">{employee.cid}</td>

                <td className="border border-gray-300 px-4 py-2">
                  {employee.fullname}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {employee.designation ? employee.designation.title : '-'}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {parseFloat(employee.basic_pay).toFixed(2)}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {parseFloat(employee.allowances).toFixed(2)}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {parseFloat(employee.gross_pay).toFixed(2)}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {parseFloat(employee.total_deductions).toFixed(2)}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {parseFloat(employee.net_pay).toFixed(2)}
                </td>

                <td className="border border-gray-300 px-4 py-2 underline text-amber-600">
                  View Details
                </td>
              </tr>
            ))
          ) : (
            <tr>
            <td className="border border-gray-300 px-4 py-2">N/A</td>

            <td className="border border-gray-300 px-4 py-2">
              -
            </td>

            <td className="border border-gray-300 px-4 py-2">-</td>

            <td className="border border-gray-300 px-4 py-2">
              -
            </td>

            <td className="border border-gray-300 px-4 py-2">
              -
            </td>

            <td className="border border-gray-300 px-4 py-2">
              -
            </td>
            
            <td className="border border-gray-300 px-4 py-2">
              -
            </td>
            
            <td className="border border-gray-300 px-4 py-2">
              -
            </td>
            
            <td className="border border-gray-300 px-4 py-2">
              -
            </td>
            
            <td className="border border-gray-300 px-4 py-2">
              -
            </td>
            
            <td className="border border-gray-300 px-4 py-2">
              -
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EligibleEmployeesTable;