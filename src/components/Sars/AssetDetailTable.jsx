import React, { useState } from 'react';
import { Table } from 'flowbite-react';  // Import Flowbite Table component
import { FaEdit, FaTrash } from 'react-icons/fa';  // Import React Icons for Edit and Delete
import AssetDetailsForm from './AssetDetailsForm';
import DeletionAsset from './DeleteAsset';

const AssetDetailsTable = ({ assets, setAssets = f => f }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssets, setFilteredAssets] = useState(assets);
  const [isEditing, setIsEditing] = useState(null)
  const [isDeleteOpen,setIsDeleteOpen] = useState(null)

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter assets based on search query
    const filtered = assets.filter((asset) => {
      return (
        asset.assetType.name.toLowerCase().includes(query.toLowerCase()) ||
        asset.registrationId.toLowerCase().includes(query.toLowerCase()) ||
        asset.model.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredAssets(filtered);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Flex container for header and search bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-sky-600">Asset Details</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Asset Type, Registration ID, or Model"
          className="p-2 w-full sm:w-[300px] border border-sky-700 rounded-md text-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell className='bg-sky-700 px-2 text-white border border-sky-700'>Asset Type</Table.HeadCell>
          <Table.HeadCell className='bg-sky-700 px-2 text-white border border-sky-700'>Registration ID</Table.HeadCell>
          <Table.HeadCell className='bg-sky-700 px-2 text-white border border-sky-700'>Purchase Date</Table.HeadCell>
          <Table.HeadCell className='bg-sky-700 px-2 text-white border border-sky-700'>Model</Table.HeadCell>
          <Table.HeadCell className='bg-sky-700 px-2 text-white border border-sky-700'>Purchase Value</Table.HeadCell>
          <Table.HeadCell className='bg-sky-700 px-2 text-white border border-sky-700'>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredAssets.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">No assets found.</td>
            </tr>
          ) : (
            filteredAssets.map((asset) => (
              <Table.Row key={asset._id} id={asset._id} className="hover:bg-gray-100">
                <Table.Cell className='px-2 border border-sky-700'>{asset.assetType.name}</Table.Cell>
                <Table.Cell className='px-2 border border-sky-700'>{asset.registrationId}</Table.Cell>
                <Table.Cell className='px-2 border border-sky-700'>{new Date(asset.purchaseDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell className='px-2 border border-sky-700'>{asset.model}</Table.Cell>
                <Table.Cell className='px-2 border border-sky-700'>&#8377;{asset.purchaseValue}</Table.Cell>
                <Table.Cell className='px-2 border border-sky-700'>
                  <button className="text-blue-500 hover:text-blue-700 mx-2" onClick={e => setIsEditing(asset)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={e => setIsDeleteOpen(asset._id)}>
                    <FaTrash />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
      {
        isEditing && (
            <div className='w-screen h-screen fixed top-0 left-0 bg-[#00000080] flex items-center justify-center'>
                <AssetDetailsForm assets={assets} setAssets={setAssets} asset={isEditing} type='edit' setIsEditing={setIsEditing} />
            </div>
        )
      }
      {
        isDeleteOpen && (<DeletionAsset setIsConfirmationOpen={setIsDeleteOpen} asset_id={isDeleteOpen} type='asset' />)
      }
    </div>
  );
};

export default AssetDetailsTable;