import React, { useState, useEffect } from 'react';
import { createAccountHead, updateAccountHead, getAccountingHeads, getAssets, getStocks } from './helper/adminApiCalls'; // Assume API helper functions
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import { MdClose } from 'react-icons/md';

const AccountHeadForm = ({ accountHead, type = 'add', setIsEditing = f => f, onFormSubmit = f => f , modulee = "major"}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: modulee === 'major' ? 'major' : 'sub-major',
    parent: '',
    asset: false,
    description: '',
    assets: [],
    stocks: [],
  });

  const [accountHeads, setAccountHeads] = useState([]);
  const [allAssets, setAllAssets] = useState([]);
  const [allStocks, setAllStocks] = useState([]);

  const { auth } = useAuthContext();
  const { admin, token } = auth;

  const fetchDependencies = async () => {
    try {
      const [headRes, assetRes, stockRes] = await Promise.all([
        getAccountingHeads(admin._id, token), // Fetch existing accounting heads
        getAssets(admin._id, token),          // Fetch assets
        getStocks(admin._id, token),          // Fetch stocks
      ]);

      if (headRes.success) setAccountHeads(headRes.data.accountingHeads);
      if (assetRes.success) setAllAssets(assetRes.data);
      if (stockRes.success) setAllStocks(stockRes.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load dependencies.');
    }
  };

  useEffect(() => {
    fetchDependencies();

    if (type === 'edit' && accountHead) {
      setFormData({
        name: accountHead.name || '',
        type: accountHead.type || 'major',
        parent: accountHead.parent || '',
        asset: accountHead.asset || false,
        description: accountHead.description || '',
        assets: accountHead.assets || [],
        stocks: accountHead.stocks || [],
      });
    }
  }, [type, accountHead]);

  useEffect(() => {
    setFormData({...formData, type: modulee === 'major' ? 'major' : 'sub-major'});
  }, [modulee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addToAssets = (assetId) => {
    if (!formData.assets.includes(assetId)) {
      setFormData((prevData) => ({
        ...prevData,
        assets: [...prevData.assets, assetId],
      }));
    }
  };

  const removeFromAssets = (assetId) => {
    setFormData((prevData) => ({
      ...prevData,
      assets: prevData.assets.filter((id) => id !== assetId),
    }));
  };

  const addToStocks = (stockId) => {
    if (!formData.stocks.includes(stockId)) {
      setFormData((prevData) => ({
        ...prevData,
        stocks: [...prevData.stocks, stockId],
      }));
    }
  };

  const removeFromStocks = (stockId) => {
    setFormData((prevData) => ({
      ...prevData,
      stocks: prevData.stocks.filter((id) => id !== stockId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = type === 'add'
        ? await createAccountHead(admin._id, token, formData)
        : await updateAccountHead(admin._id, token, accountHead._id, formData);

      if (response.success) {
        toast.success(`Accounting head ${type === 'add' ? 'created' : 'updated'} successfully!`);
        onFormSubmit(response.data); // Callback to update the parent component
        setIsEditing(null); // Close the modal
      } else {
        toast.error(response.message || 'Failed to save accounting head.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while saving.');
    }
  };

  return (
    <div className={`p-5 ${type === 'add' ? 'mt-[130px]' : 'mt-[40px]'} bg-slate-200 border-b border-sky-500 relative top-0`}>
      <h2 className="text-2xl font-semibold text-sky-600">
        {type === 'add' ? 'Add Accounting Head' : 'Edit Accounting Head'}
      </h2>

      {
        type === 'edit' && (
          <MdClose onClick={e => setIsEditing(false)} className='absolute top-[-20px] right-[-20px] bg-rose-500 rounded-full text-[40px] p-2 text-zinc-50 cursor-pointer' />
        )
      }
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-4">
        {/* Name and Type */}

        <div>
          <label htmlFor="code" className="block text-sm font-semibold text-gray-700">Code</label>
          <input
            type="text"
            name="code"
            id="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-semibold text-gray-700">Type</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="major">Major</option>
            <option value="sub-major">Sub-Major</option>
          </select>
        </div>

        {/* Parent Dropdown */}
        {formData.type === 'sub-major' && (
          <div>
            <label htmlFor="parent" className="block text-sm font-semibold text-gray-700">Parent</label>
            <select
              name="parent"
              id="parent"
              value={formData.parent}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="">Select Parent</option>
              {accountHeads.map((head) => (
                <option key={head._id} value={head._id}>{head.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Sync with SARS */}
        {/* <div>
          <label htmlFor="asset" className="block text-sm font-semibold text-gray-700">Sync with SARS</label>
          <input
            type="checkbox"
            name="asset"
            id="asset"
            checked={formData.asset}
            onChange={handleChange}
            className="mt-2"
          />
        </div> */}

        {/* Description */}
        <div className="col-span-2">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
          />
        </div>

        {/* Assets */}
        <div>
          <label htmlFor="assets" className="block text-sm font-semibold text-gray-700">Add Asset</label>
          <select
            name="assets"
            id="assets"
            onChange={(e) => addToAssets(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Asset</option>
            {allAssets.map((asset) => (
              <option key={asset._id} value={asset._id}>{asset.model}</option>
            ))}
          </select>
          <ul className="mt-2">
            {formData.assets.map((assetId) => (
              <li key={assetId} className="flex justify-between">
                {allAssets.find((a) => a._id === assetId)?.model || 'Unknown'}
                <button type="button" onClick={() => removeFromAssets(assetId)} className="text-red-500">Remove</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Stocks */}
        <div>
          <label htmlFor="stocks" className="block text-sm font-semibold text-gray-700">Add Stock</label>
          <select
            name="stocks"
            id="stocks"
            onChange={(e) => addToStocks(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Stock</option>
            {allStocks.map((stock) => (
              <option key={stock._id} value={stock._id}>{stock.model}</option>
            ))}
          </select>
          <ul className="mt-2">
            {formData.stocks.map((stockId) => (
              <li key={stockId} className="flex justify-between">
                {allStocks.find((s) => s._id === stockId)?.model || 'Unknown'}
                <button type="button" onClick={() => removeFromStocks(stockId)} className="text-red-500">Remove</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 col-span-2"
        >
          {type === 'add' ? 'Add Accounting Head' : 'Update Accounting Head'}
        </button>
      </form>
    </div>
  );
};

export default AccountHeadForm;