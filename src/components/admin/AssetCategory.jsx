import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../base/Navbar';
import { createAssetCategoryAdmin, deleteAssetCategoryAdmin, editAssetCategoryAdmin, getAssetCategoriesAdmin } from './helper/adminApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { IoCloseCircle } from "react-icons/io5";
import Sidebar from './Sidebar';

const AssetCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    depreciationRate: ''
  });
  const [isEditOpen,setIsEditOpen] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const {auth} = useAuthContext()

  const {admin, token} = auth
  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      getAssetCategoriesAdmin(admin._id,token).then(data => {
        setCategories(data.data)
      }).catch(error => {
        console.log(error);
      })
    };
    fetchCategories();
  }, []);

  // Handle form submission for creating new category
  const handleCreateCategory = async () => {
    createAssetCategoryAdmin(admin._id,token,newCategory).then(data => {
      if(data.success){
        setCategories([...categories, data.data])
        return
      }

      toast.error('Faild to create category')
    }).catch(error => {
      console.log(error);
    })
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    deleteAssetCategoryAdmin(admin._id,token,categoryId).then(data => {
      if(data.success){
        setCategories(categories.filter(cate => cate._id !== categoryId))
        toast.success('Category deleted successfully')
        return
      }

      toast.error('Faild to delete category')
    }).catch(error => {
      console.log(error);
    })
  };

  const handleEditCategory = async (categoryId, tempData) => {
    editAssetCategoryAdmin(admin._id,token,tempData,categoryId).then(data => {
      if(data.success){
        setCategories(categories.map(cate =>{
          if(cate._id === categoryId){
            return cate = data.data
          }

          return cate
        }))
        toast.success('Category updated successfully')
        setIsEditOpen(null)
        return
      }

      toast.error('Faild to update category')
    }).catch(error => {
      console.log(error);
    })
  };

  const EditForm = () => {
    const [tempData, setTempData] = useState({
      name: isEditOpen.name,
      depreciationRate: isEditOpen.depreciationRate
    })

    const {name, depreciationRate} = tempData
    return(
      <div className='w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-[#00000080]'>
        <div className="mt-4 px-4 flex gap-4 h-[80px] p-4 bg-zinc-200 rounded relative top-0">
        <IoCloseCircle onClick={e => setIsEditOpen(null)} className='text-rose-600 cursor-pointer absolute right-[-20px] top-[-20px] text-[44px]' />
          <input
            type="text"
            placeholder="Enter category title"
            value={name}
            onChange={(e) => setTempData({...tempData, name: e.target.value})}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Enter depreciation rate"
            value={depreciationRate}
            onChange={(e) => setTempData({...tempData, depreciationRate: e.target.value})}
            className="border p-2 rounded-md"
          />
          <button
            onClick={() => handleEditCategory(isEditOpen._id, tempData)}
            className="ml-2 bg-sky-600 text-white p-2 rounded-md"
          >
            Update Category
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex gap-8">
      <Navbar type='admin' />

      <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
          <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
      </div>

    <div className='w-full'>
    <h2 className="text-2xl font-semibold text-sky-600 mt-[100px] px-4">Asset Categories</h2>
      
      {/* Form to create new category */}
      <div className="mt-4 px-4 flex gap-4">
        <input
          type="text"
          placeholder="Enter category title"
          value={newCategory.name}
          onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Enter depreciation rate"
          value={newCategory.depreciationRate}
          onChange={(e) => setNewCategory({...newCategory, depreciationRate: e.target.value})}
          className="border p-2 rounded-md"
        />
        <button
          onClick={handleCreateCategory}
          className="ml-2 bg-sky-600 text-white p-2 rounded-md"
        >
          Create Category
        </button>
      </div>

      {/* Categories Table */}
      <div className='px-4'>
        <table className="mt-6 w-full text-left">
          <thead>
            <tr>
              <th className="border px-4 py-2">Category Title</th>
              <th className="border px-4 py-2">Depreciation Rate</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 && categories.map(category => (
              <tr key={category._id}>
                <td className="border px-4 py-2">{category.name}</td>
                <td className="border px-4 py-2">{category.depreciationRate}%</td>
                <td className="border px-4 py-2 flex justify-between">
                <button
                    onClick={() => setIsEditOpen(category)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>    

                  <button
                    onClick={() => handleDeleteCategory(category._id)}
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

      {
        isEditOpen && (<EditForm />)
      }
    </div>

    </div>
  );
};

export default AssetCategory;