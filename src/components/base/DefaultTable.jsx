import React, { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css"; // Import the DataTable CSS for styling
import FullEmployee from "../Eu/FullEmployee";
import EmployeeManageForm from "../Eu/EmployeeManageForm";
import DeletionModal from "../Eu/DeletionModal";
import toast from "react-hot-toast";
import { toggleActiveEmployeeHrm } from "../Eu/helper/euApiCalls";
import { useAuthContext } from "../../context/AuthContext";

const DefaultTable = ({datas = [], type}) => {
  const [data,setData] = useState(datas)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [editEmployee,setEditEmployee] = useState(null)
  const [isConfirmationOpen,setIsConfirmationOpen] = useState(null)
  const [toRemove,setToRemove] = useState(null)
  const {auth} = useAuthContext()

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

  const toggleActiveStatus = async (emp_id) => {
    try {
      const userId = type === 'eu' ? auth.endUser._id : auth.admin._id

      const dataa = await toggleActiveEmployeeHrm(userId, auth.token, emp_id)
      console.log(dataa);
      

      if(dataa.error){
        toast.error('Faild to update active status')
        return
      }

      toast.success('Status updated successfully')

      setData(data.map((emp) => {
        if( emp._id !== emp_id){
          return emp
        }

        emp.is_active = dataa.message.is_active

        return emp
    }))

    } catch (error) {
      return toast.error('Faild to toggle active status')
    }
  }

  useEffect(()=>{
    
    if(toRemove){
      setData(prevData => prevData.filter(item => item.id !== toRemove))
    }
  },[toRemove])

  return (
    <div className="overflow-hidden">
      <table id="default-table" className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
          <th className="border border-gray-300 px-4 py-2">SL No#</th>
          <th className="border border-gray-300 px-4 py-2">Emp. Id</th>
          <th className="border border-gray-300 px-4 py-2">CID</th>
            <th className="border border-gray-300 px-4 py-2">
              <span className="flex items-center">
                Name
              </span>
            </th>
            <th className="border border-gray-300 px-4 py-2">Basic Pay</th>
            <th className="border border-gray-300 px-4 py-2">Designation</th>
            <th className="border border-gray-300 px-4 py-2">Emp. Type</th>
            <th className="border border-gray-300 px-4 py-2">Edit</th>
            <th className="border border-gray-300 px-4 py-2">Delete</th>
            <th className="border border-gray-300 px-4 py-2">In-activate</th>
          </tr>
        </thead>
        <tbody>
            {
                data.length > 0 && data.map((employee, index) => (
                <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.emp_id}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.cid}</td>
                    <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white border border-gray-300 px-4 py-2">
                        {employee.fullname}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{parseInt(employee.benefits.basic_pay).toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.designation ? employee.designation.title : '-'}</td>
                    <td className="border border-gray-300 px-4 py-2">Regular</td>
                    <td onClick={e => setEditEmployee(employee._id)} className="border border-gray-300 px-4 py-2"><b className="text-blue-500 underline cursor-pointer">Edit</b></td>
                    <td onClick={e => setIsConfirmationOpen(employee._id)} className="border border-gray-300 px-4 py-2"><b className="text-rose-500 underline cursor-pointer">Delete</b></td>
                    <td onClick={e => toggleActiveStatus(employee._id)} className="border border-gray-300 px-4 py-2"><b className="text-amber-500 underline cursor-pointer">{employee.is_active ? 'In-activate' : 'Activate'}</b></td>
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
      {
        editEmployee && (
          <EmployeeManageForm employee_id={editEmployee} type="edit" setIsFormOpen={setEditEmployee} />
        )
      }
      {
        isConfirmationOpen && (
          <DeletionModal setIsConfirmationOpen={setIsConfirmationOpen} employee_id={isConfirmationOpen} setToRemove={setToRemove} />
        )
      }
    </div>
  );
};

export default DefaultTable;
