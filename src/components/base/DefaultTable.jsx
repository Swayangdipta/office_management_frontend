import React, { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css"; // Import the DataTable CSS for styling
import FullEmployee from "../Eu/FullEmployee";

const DefaultTable = (data) => {

  const [currentEmployee, setCurrentEmployee] = useState(null)
    
  useEffect(() => {
    const tableElement = document.getElementById("default-table");
    if (tableElement) {
      new DataTable(tableElement, {
        searchable: true,
        perPageSelect: false,
        paging: true,
        perPage: 15,
        sortable: false
      });
    }
  }, []);

  return (
    <div className="overflow-hidden">
      <table id="default-table" className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">
              <span className="flex items-center">
                Name
              </span>
            </th>
            <th className="border border-gray-300 px-4 py-2">Employee Id</th>
            <th className="border border-gray-300 px-4 py-2">Date of birth</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
            {
                data.data.length > 0 && data.data.map((employee) => (
                <tr>
                    <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white border border-gray-300 px-4 py-2">
                        {employee.fullname}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{employee.emp_id}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.date_of_birth.slice(0,10)}</td>
                    <td className="border border-gray-300 px-4 py-2 flex items-center justify-between">
                        <p className="font-bold underline text-sky-600 cursor-pointer">Edit</p>
                        <p className="font-bold underline text-rose-600 cursor-pointer">Delete</p>
                        <p onClick={e => setCurrentEmployee(employee)} className="font-bold underline text-amber-600 cursor-pointer">More</p>
                    </td>
                </tr>
                ))
            }
        </tbody>
      </table>

      {
        currentEmployee && (
          <FullEmployee employee={currentEmployee} isFullEmployeeOpen={setCurrentEmployee} />
        )
      }
    </div>
  );
};

export default DefaultTable;
