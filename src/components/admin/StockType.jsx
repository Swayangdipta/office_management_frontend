import React, { useState, useEffect } from 'react';
import { createStockTypeAdmin, deleteStockTypeAdmin, editStockTypeAdmin, getStockTypesAdmin } from './helper/adminApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { IoCloseCircle } from "react-icons/io5";
import Navbar from '../base/Navbar';
import Sidebar from './Sidebar';

const StockType = () => {
  const [stockTypes, setStockTypes] = useState([]);
  const [newStockType, setNewStockType] = useState({ name: '', description: '' });
  const [isEditOpen, setIsEditOpen] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const { auth } = useAuthContext();
  const { admin, token } = auth;

  // Fetch stock types
  useEffect(() => {
    getStockTypesAdmin(admin._id, token)
      .then(data => setStockTypes(data.data))
      .catch(err => console.error(err));
  }, []);

  // Create Stock Type
  const handleCreateStockType = () => {
    createStockTypeAdmin(admin._id, token, newStockType)
      .then(data => {
        if (data.success) {
          setStockTypes([...stockTypes, data.data]);
          toast.success('Stock Type created successfully');
          setNewStockType({ name: '', description: '' });
        } else {
          toast.error('Failed to create Stock Type');
        }
      })
      .catch(err => console.error(err));
  };

  // Delete Stock Type
  const handleDeleteStockType = (id) => {
    deleteStockTypeAdmin(admin._id, token, id)
      .then(data => {
        if (data.success) {
          setStockTypes(stockTypes.filter(type => type._id !== id));
          toast.success('Stock Type deleted successfully');
        } else {
          toast.error('Failed to delete Stock Type');
        }
      })
      .catch(err => console.error(err));
  };

  // Edit Stock Type
  const handleEditStockType = (id, tempData) => {
    editStockTypeAdmin(admin._id, token, tempData, id)
      .then(data => {
        if (data.success) {
          setStockTypes(stockTypes.map(type => (type._id === id ? data.data : type)));
          toast.success('Stock Type updated successfully');
          setIsEditOpen(null);
        } else {
          toast.error('Failed to update Stock Type');
        }
      })
      .catch(err => console.error(err));
  };

  const EditForm = () => {
    const [tempData, setTempData] = useState({ name: isEditOpen.name, description: isEditOpen.description });

    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-[#00000080]">
        <div className="mt-4 px-4 flex gap-4 h-[80px] p-4 bg-zinc-200 rounded relative top-0">
          <IoCloseCircle onClick={() => setIsEditOpen(null)} className='text-rose-600 cursor-pointer absolute right-[-20px] top-[-20px] text-[44px]' />
          <input
            type="text"
            placeholder="Enter Stock Type name"
            value={tempData.name}
            onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Enter description"
            value={tempData.description}
            onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
            className="border p-2 rounded-md"
          />
          <button
            onClick={() => handleEditStockType(isEditOpen._id, tempData)}
            className="ml-2 bg-sky-600 text-white p-2 rounded-md"
          >
            Update
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen flex gap-8">
      <Navbar type="admin" />

      <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
          <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
      </div>

      <div className='w-full'>
      <h2 className="text-2xl font-semibold text-sky-600 mt-[150px] px-4">Stock Types</h2>

      {/* Form to create new Stock Type */}
      <div className="mt-4 px-4 flex gap-4">
        <input
          type="text"
          placeholder="Enter Stock Type name"
          value={newStockType.name}
          onChange={(e) => setNewStockType({ ...newStockType, name: e.target.value })}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Enter description"
          value={newStockType.description}
          onChange={(e) => setNewStockType({ ...newStockType, description: e.target.value })}
          className="border p-2 rounded-md"
        />
        <button
          onClick={handleCreateStockType}
          className="ml-2 bg-sky-600 text-white p-2 rounded-md"
        >
          Create
        </button>
      </div>

      {/* Table to display Stock Types */}
      <div className="px-4">
        <table className="mt-6 w-full text-left">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockTypes.map(type => (
              <tr key={type._id}>
                <td className="border px-4 py-2">{type.name}</td>
                <td className="border px-4 py-2">{type.description}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setIsEditOpen(type)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStockType(type._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditOpen && <EditForm />}
      </div>
    </div>
  );
};

export default StockType;