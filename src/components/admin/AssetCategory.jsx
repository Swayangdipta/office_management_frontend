import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssetCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/sars/category`);
        setCategories(response.data.data);
        console.log(response);
        
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle form submission for creating new category
  const handleCreateCategory = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/sars/category`, { title: newCategory });
      setCategories([...categories, response.data.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category', error);
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/sars/category/${categoryId}`);
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-sky-600">Asset Categories</h2>
      
      {/* Form to create new category */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter category title"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
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
      <table className="mt-6 w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">Category Title</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map(category => (
            <tr key={category._id}>
              <td className="border px-4 py-2">{category.title}</td>
              <td className="border px-4 py-2">
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
  );
};

export default AssetCategory;