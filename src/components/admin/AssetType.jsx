import React, { useState, useEffect } from 'react';
import { createAssetTypeAdmin, deleteAssetTypeAdmin, editAssetTypeAdmin, getAssetCategoriesAdmin, getAssetTypesAdmin } from './helper/adminApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { IoCloseCircle } from "react-icons/io5";
import Navbar from '../base/Navbar';

const AssetType = () => {
  const [assetTypes, setAssetTypes] = useState([]);
  const [assetCategories, setAssetCategories] = useState([]);
  const [newAssetType, setNewAssetType] = useState({ name: '', category: '' });
  const [isEditOpen, setIsEditOpen] = useState(null);

  const { auth } = useAuthContext();
  const { admin, token } = auth;

  useEffect(() => {
    getAssetTypesAdmin(admin._id, token)
      .then(data => setAssetTypes(data.data))
      .catch(err => console.error(err));

    getAssetCategoriesAdmin(admin._id, token)
      .then(data => setAssetCategories(data.data))
      .catch(err => console.error(err));
  }, []);

  const handleCreateAssetType = () => {
    createAssetTypeAdmin(admin._id, token, newAssetType)
      .then(data => {
        if (data.success) {
            const newData = {
                name: data.data.name,
                category: assetCategories.find(item => item._id === newAssetType.category),
            }
          setAssetTypes([...assetTypes, newData]);
          toast.success('Asset Type created successfully');
        } else {
          toast.error('Failed to create Asset Type');
        }
      })
      .catch(err => console.error(err));
  };

  const handleDeleteAssetType = (id) => {
    deleteAssetTypeAdmin(admin._id, token, id)
      .then(data => {
        if (data.success) {
          setAssetTypes(assetTypes.filter(type => type._id !== id));
          toast.success('Asset Type deleted successfully');
        } else {
          toast.error('Failed to delete Asset Type');
        }
      })
      .catch(err => console.error(err));
  };

  const handleEditAssetType = (id, tempData) => {
    editAssetTypeAdmin(admin._id, token, tempData, id)
      .then(data => {
        if (data.success) {
          setAssetTypes(assetTypes.map(type => (type._id === id ? data.data : type)));
          toast.success('Asset Type updated successfully');
          setIsEditOpen(null);
        } else {
          toast.error('Failed to update Asset Type');
        }
      })
      .catch(err => console.error(err));
  };

  const EditForm = () => {
    const [tempData, setTempData] = useState({ name: isEditOpen.name, category: isEditOpen.category });

    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-[#00000080]">
        <div className="mt-4 px-4 flex gap-4 h-[80px] p-4 bg-zinc-200 rounded relative top-0">
          <IoCloseCircle onClick={() => setIsEditOpen(null)} className='text-rose-600 cursor-pointer absolute right-[-20px] top-[-20px] text-[44px]' />
          <input
            type="text"
            placeholder="Enter Asset Type name"
            value={tempData.name}
            onChange={(e) => setTempData({ name: e.target.value })}
            className="border p-2 rounded-md"
          />
        <select value={tempData.category} onChange={e => setTempData({ category: e.target.value })} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-max">
            <option selected="">Select Category</option>
            {
                assetCategories.length > 0 && assetCategories.map((item, index) => (
                    <option key={index} value={item._id}>{item.name}</option>
                ))
            }
        </select>
          <button
            onClick={() => handleEditAssetType(isEditOpen._id, tempData)}
            className="ml-2 bg-sky-600 text-white p-2 rounded-md"
          >
            Update
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen">
        <Navbar type='admin' />
      <h2 className="text-2xl font-semibold text-sky-600 mt-[100px] px-4">Asset Types</h2>
      
      <div className="mt-4 px-4 flex gap-4">
        <input
          type="text"
          placeholder="Enter Asset Type name"
          value={newAssetType.name}
          onChange={(e) => setNewAssetType({...newAssetType, name: e.target.value })}
          className="border p-2 rounded-md"
        />

        <select value={newAssetType.category} onChange={e => setNewAssetType({...newAssetType, category: e.target.value })} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-max">
            <option selected="">Select Category</option>
            {
                assetCategories.length > 0 && assetCategories.map((item, index) => (
                    <option key={index} value={item._id}>{item.name}</option>
                ))
            }
        </select>
        <button
          onClick={handleCreateAssetType}
          className="ml-2 bg-sky-600 text-white p-2 rounded-md"
        >
          Create
        </button>
      </div>

      <div className="px-4">
        <table className="mt-6 w-full text-left">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Category Depreciation Rate</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetTypes.map(type => (
              <tr key={type._id}>
                <td className="border px-4 py-2">{type.name}</td>
                <td className="border px-4 py-2">{type.category.name}</td>
                <td className="border px-4 py-2">{type.category.depreciationRate}%</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setIsEditOpen(type)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAssetType(type._id)}
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
  );
};

export default AssetType;
