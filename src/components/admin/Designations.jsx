import React, { useState, useEffect } from 'react';
import { createDesignation, deleteDesignation, editDesignation, getDesignations } from './helper/adminApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { IoCloseCircle } from "react-icons/io5";
import Navbar from '../base/Navbar';
import Sidebar from './Sidebar';

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const [newDesignation, setNewDesignation] = useState({ title: '' });
  const [isEditOpen, setIsEditOpen] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const { auth } = useAuthContext();
  const { admin, token } = auth;

  // Fetch designations
  useEffect(() => {
    getDesignations(admin._id, token)
      .then(data => setDesignations(data.data))
      .catch(err => console.error(err));
  }, []);

  // Create a new designation
  const handleCreateDesignation = () => {
    createDesignation(admin._id, token, newDesignation)
      .then(data => {
        if (data.success) {
          setDesignations([...designations, data.data]);
          toast.success('Designation created successfully');
          setNewDesignation({ title: '' });
        } else {
          toast.error('Failed to create designation');
        }
      })
      .catch(err => console.error(err));
  };

  // Delete a designation
  const handleDeleteDesignation = (id) => {
    deleteDesignation(admin._id, token, id)
      .then(data => {
        if (data.success) {
          setDesignations(designations.filter(designation => designation._id !== id));
          toast.success('Designation deleted successfully');
        } else {
          toast.error('Failed to delete designation');
        }
      })
      .catch(err => console.error(err));
  };

  // Edit a designation
  const handleEditDesignation = (id, tempData) => {
    editDesignation(admin._id, token, tempData, id)
      .then(data => {
        if (data.success) {
          setDesignations(designations.map(designation => (designation._id === id ? data.data : designation)));
          toast.success('Designation updated successfully');
          setIsEditOpen(null);
        } else {
          toast.error('Failed to update designation');
        }
      })
      .catch(err => console.error(err));
  };

  const EditForm = () => {
    const [tempData, setTempData] = useState({ title: isEditOpen.title });

    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-[#00000080]">
        <div className="mt-4 px-4 flex gap-4 h-[80px] p-4 bg-zinc-200 rounded relative top-0">
          <IoCloseCircle onClick={() => setIsEditOpen(null)} className='text-rose-600 cursor-pointer absolute right-[-20px] top-[-20px] text-[44px]' />
          <input
            type="text"
            placeholder="Enter Designation title"
            value={tempData.title}
            onChange={(e) => setTempData({ title: e.target.value })}
            className="border p-2 rounded-md"
          />
          <button
            onClick={() => handleEditDesignation(isEditOpen._id, tempData)}
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
        <h2 className="text-2xl font-semibold text-sky-600 mt-[100px] px-4">Designations</h2>

        {/* Form to create new Designation */}
        <div className="mt-4 px-4 flex gap-4">
          <input
            type="text"
            placeholder="Enter Designation title"
            value={newDesignation.title}
            onChange={(e) => setNewDesignation({ title: e.target.value })}
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleCreateDesignation}
            className="ml-2 bg-sky-600 text-white p-2 rounded-md"
          >
            Create
          </button>
        </div>

        {/* Table to display Designations */}
        <div className="px-4">
          <table className="mt-6 w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designations.map(designation => (
                <tr key={designation._id}>
                  <td className="border px-4 py-2">{designation.title}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => setIsEditOpen(designation)}
                      className="bg-amber-600 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDesignation(designation._id)}
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

export default Designations;