import React, { useEffect, useState } from 'react';
import { createAssetDetail, getAssetTypesSars, updateAssetDetail } from './helper/sarsApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { IoCloseCircle } from "react-icons/io5";
import { getAllAccountHeadAM } from '../am/helper/amApiCalls';

const AssetDetailsForm = ({ assets = [], setAssets = f => f, type = 'add', asset, setIsEditing = f => f }) => {
  const [allAssetTypes, setAllAssetTypes] = useState([]);
  const [allHeads, setAllHeads] = useState([]);
  const [formData, setFormData] = useState({
    assetType: '',
    registrationId: '',
    purchaseDate: '',
    model: '',
    purchaseValue: '',
    accountingHead: ''
  });

  const { auth, token } = useAuthContext();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the form (create or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === 'add') {
      // Create new asset detail
      createAssetDetail(auth.endUser?._id, token, formData).then((data) => {
        if (!data.success) {
          return toast.error('Failed to add asset. Try again');
        }

        setFormData({
          assetType: '',
          registrationId: '',
          purchaseDate: '',
          model: '',
          purchaseValue: '',
        });

        setAssets([...assets, data.data]);
        toast.success('Asset added successfully');
      }).catch((error) => {
        console.log(error);
        toast.error('Error adding asset');
      });
    } else if (type === 'edit') {
      // Update existing asset detail
      console.log(asset);
      
      updateAssetDetail(auth.endUser?._id, token, formData, asset._id).then((data) => {
        console.log(data);
        
        if (!data.success) {
          return toast.error('Failed to update asset. Try again');
        }

        setAssets(
          assets.map((existingAsset) => (existingAsset._id === asset._id ? data.data : existingAsset))
        );

        setIsEditing(null)
        toast.success('Asset updated successfully');
      }).catch((error) => {
        console.log(error);
        toast.error('Error updating asset');
      });
    }
  };

  // Fetch asset types
  const getAssetTypes = () => {
    getAssetTypesSars(auth.endUser?._id, token).then((data) => {
      if (data.success) {
        setAllAssetTypes(data.data);
      } else {
        toast.error('Something went wrong while fetching asset types');
      }
    }).catch((error) => {
      console.error(error);
      toast.error('Error fetching asset types');
    });
  };

  const getAccountHeads = () => {
    getAllAccountHeadAM(auth.endUser?._id, token, 'major').then((data) => {
      console.log(data);
      
      if (data.success) {
        setAllHeads(data.data.accountingHeads);
      } else {
        toast.error('Something went wrong while fetching asset types');
      }
    }).catch((error) => {
      console.error(error);
      toast.error('Error fetching asset types');
    });
  };

  useEffect(() => {
    getAssetTypes();
    getAccountHeads();

    // If in edit mode, pre-fill form with existing asset details
    if (type === 'edit' && asset) {
      setFormData({
        assetType: asset.assetType._id,  // Assuming assetType is an object with an _id field
        registrationId: asset.registrationId,
        purchaseDate: asset.purchaseDate,
        model: asset.model,
        purchaseValue: asset.purchaseValue,
      });
    }
  }, [type, asset]);

  return (
    <div className="p-5 mt-[130px] bg-slate-200 border-b border-sky-500 relative top-0">
        {type !== 'add' && (
            <IoCloseCircle onClick={e => setIsEditing(null)} className='text-rose-600 cursor-pointer absolute right-[-10px] top-[-10px] text-[44px]' />
        )}
      <h2 className="text-2xl font-semibold text-sky-600">{type === 'add' ? 'Add Asset Details' : 'Edit Asset Details'}</h2>
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="assetType" className="block text-sm font-semibold text-gray-700">
            Asset Type
          </label>
          <select
            name="assetType"
            value={formData.assetType}
            onChange={handleChange}
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          >
            <option value="">Select Asset Type</option>
            {allAssetTypes.length > 0 &&
              allAssetTypes.map((assetType, index) => (
                <option key={index} value={assetType._id}>
                  {assetType.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="registrationId" className="block text-sm font-semibold text-gray-700">
            Registration ID
          </label>
          <input
            type="text"
            id="registrationId"
            name="registrationId"
            value={formData.registrationId}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="purchaseDate" className="block text-sm font-semibold text-gray-700">
            Purchase Date
          </label>
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={formData.purchaseDate.slice(0,10)}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-semibold text-gray-700">
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="purchaseValue" className="block text-sm font-semibold text-gray-700">
            Purchase Value
          </label>
          <input
            type="number"
            id="purchaseValue"
            name="purchaseValue"
            value={formData.purchaseValue}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="accountingHead" className="block text-sm font-semibold text-gray-700">
            Accounting Head
          </label>

          <select
            name="accountingHead"
            value={formData.accountingHead}
            onChange={handleChange}
            id="accountingHead"
            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          >
            <option value="">Select Accounting Head</option>
            {allHeads.length > 0 &&
              allHeads.map((assetType, index) => (
                <option key={index} value={assetType._id}>
                  {assetType.name}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 col-span-2"
        >
          {type === 'add' ? 'Add Asset' : 'Update Asset'}
        </button>
      </form>
    </div>
  );
};

export default AssetDetailsForm;