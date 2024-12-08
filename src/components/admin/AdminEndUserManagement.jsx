import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Table, Button, Modal, Badge } from 'flowbite-react';
import axios from 'axios';
import Navbar from '../base/Navbar';
import toast from 'react-hot-toast';
import { createEndUsers, getEndUsers } from './helper/adminApiCalls';
import { useAuthContext } from '../../context/AuthContext';

const AdminEndUserManagement = () => {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {auth} = useAuthContext()
  const {admin, token} = auth

  // Fetch End Users
  const fetchUsers = async () => {
    try {
      const response = await getEndUsers(admin._id,token)
      
      if (response.success) {
        setUsers(response.data);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      toast.error('Error fetching users');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create End User
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await createEndUsers(admin._id, token, data)
      if (response.success) {
        toast.success('User created successfully');
        fetchUsers(); // Refresh user list
        reset();
        setShowModal(false);
      } else {
        toast.error(response.response.data.error || 'Failed to create user');
      }
    } catch (error) {
      toast.error('Error creating user');
      console.error(error);
    }
  };

  return (
    <div className="w-screen min-h-screen h-max">
      <Navbar type='admin' />
      <div className="p-6 mt-[80px]">
        <h2 className="text-xl font-bold mb-4">Admin End-User Management</h2>

        {/* Add User Button */}
        <Button color="green" className="mb-4 bg-emerald-400" onClick={() => setShowModal(true)}>
          Add New User
        </Button>

        {/* Users Table */}
        <Table striped={true}>
          <Table.Head className="border">
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Name</Table.HeadCell>
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Email</Table.HeadCell>
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Contact</Table.HeadCell>
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Role</Table.HeadCell>
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user._id} className="border">
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.contact}</Table.Cell>
                <Table.Cell>
                  <Badge color="blue">{user.role}</Badge>
                </Table.Cell>
                <Table.Cell>
                  {/* Placeholder for Edit/Delete Actions */}
                  <Button size="xs" color="blue" className="mr-2">
                    Edit
                  </Button>
                  <Button size="xs" color="red" className='bg-rose-500 text-zinc-50 mt-2'>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Modal to Add User */}
        <Modal className='pt-[80px] pb-[100px]' show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>Create New User</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  {...register('contact', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  {...register('role', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Select a Role</option>
                  <option value="HRM">HRM</option>
                  <option value="AM">AM</option>
                  <option value="SAM">SAM</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register('confirmPassword', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <Button type="submit" color="green" className='bg-emerald-400'>
                Create User
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AdminEndUserManagement;