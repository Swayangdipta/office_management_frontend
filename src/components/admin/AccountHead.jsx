import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AccountHeadForm from './AccountHeadForm';
import DeleteConfirmation from './DeleteConfirmation';
import { getAccountHeads, deleteAccountHead } from './helper/adminApiCalls'; // Import API functions
import { useAuthContext } from '../../context/AuthContext';

const AccountHead = () => {
  const [accountHeads, setAccountHeads] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(null);

  const {auth} = useAuthContext()

  const {admin,token} = auth

  // Fetch account heads
  const fetchAccountHeads = () => {
    getAccountHeads(admin._id, token)
      .then((data) => {
        if (data.success) {
          setAccountHeads(data.data.accountingHeads);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAccountHeads();
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    deleteAccountHead(admin._id,token,id)
      .then((data) => {
        if (data.success) {
          setAccountHeads(accountHeads.filter((head) => head._id !== id));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-sky-600">Account Heads</h2>

      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Major Head</Table.HeadCell>
          <Table.HeadCell>Sub Major Head</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {accountHeads.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">No account heads found.</td>
            </tr>
          ) : (
            accountHeads.map((head) => (
              <Table.Row key={head._id}>
                <Table.Cell>{head.parent ? head.parent.name : head.name}</Table.Cell>
                <Table.Cell>{head.parent ? head.name : '---'}</Table.Cell>
                <Table.Cell>{head.description !== '' ? head.description : '---'}</Table.Cell>
                <Table.Cell>
                  <button
                    className="text-blue-500 hover:text-blue-700 mx-2"
                    onClick={() => setIsEditing(head)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setIsDeleteOpen(head._id)}
                  >
                    <FaTrash />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      {isEditing && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-[#00000080] flex items-center justify-center">
          <AccountHeadForm
            accountHead={isEditing}
            setAccountHeads={setAccountHeads}
            setIsEditing={setIsEditing}
            type="edit"
          />
        </div>
      )}

      {isDeleteOpen && (
        <DeleteConfirmation
          onConfirm={() => {
            handleDelete(isDeleteOpen);
            setIsDeleteOpen(null);
          }}
          onCancel={() => setIsDeleteOpen(null)}
        />
      )}
    </div>
  );
};

export default AccountHead;