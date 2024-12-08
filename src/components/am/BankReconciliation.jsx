import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Table, Button, Badge, Modal } from 'flowbite-react';
import {
  getBankTransactions,
  reconcileTransaction,
  createBankTransaction,
  getAllVouchers,
  closeMonth,
  closeYear,
} from './helper/amApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Navbar from '../base/Navbar';

const BankReconciliation = () => {
  const { register, handleSubmit, reset } = useForm();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'reconciled', 'unreconciled'
  const [showModal, setShowModal] = useState(false);
  const [voucherOptions, setVoucherOptions] = useState([]);
  const { auth } = useAuthContext();
  const { endUser, token } = auth;

  // Fetch bank transactions
  React.useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getBankTransactions(endUser._id, token);
        if (response.success) {
          setTransactions(response.data);
        } else {
          toast.error('Failed to fetch bank transactions.');
        }
      } catch (error) {
        toast.error('Error fetching bank transactions.');
        console.error(error);
      }
    };

    fetchTransactions();
  }, [endUser, token]);

  // Fetch vouchers for the dropdown
  React.useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await getAllVouchers(endUser._id, token);
        if (response.success) {
          setVoucherOptions(
            response.data.map((voucher) => ({
              value: voucher._id,
              label: `${voucher._id} - ${voucher.narration} - ${voucher?.payee?.name}`,
            }))
          );
        } else {
          toast.error('Failed to fetch vouchers.');
        }
      } catch (error) {
        toast.error('Error fetching vouchers.');
        console.error(error);
      }
    };

    fetchVouchers();
  }, [token]);

  const onSubmit = async (data) => {
    try {
      const response = await createBankTransaction(endUser._id, token, data);
      if (response.success) {
        toast.success('Bank statement created successfully!');
        setTransactions((prev) => [...prev, response.data]);
        reset();
        setShowModal(false);
      } else {
        toast.error('Failed to create bank statement.');
      }
    } catch (error) {
      toast.error('Error creating bank statement.');
      console.error(error);
    }
  };

  const handleReconcile = async (transactionId) => {
    try {
      const response = await reconcileTransaction(endUser._id, token, transactionId);
      if (response.success) {
        toast.success('Transaction reconciled successfully!');
        setTransactions((transactions) =>
          transactions.map((t) => (t._id === transactionId ? { ...t, reconciled: true } : t))
        );
      } else {
        toast.error('Failed to reconcile transaction.');
      }
    } catch (error) {
      toast.error('Error reconciling transaction.');
      console.error(error);
    }
  };

  const handleMonthClose = async () => {
    try {
      const response = await closeMonth(endUser._id, token);
      if (response.success) {
        toast.success('Month closed successfully!');
      } else {
        toast.error(response.response.data.data);
      }
    } catch (error) {
      toast.error('Error closing the month.');
      console.error(error);
    }
  };

  const handleYearClose = async () => {
    try {
      const response = await closeYear(endUser._id, token);
      if (response.success) {
        toast.success('Year closed successfully!');
      } else {
        toast.error(response.response.data.data);
      }
    } catch (error) {
      toast.error('Error closing the year.');
      console.error(error);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    return filter === 'reconciled' ? transaction.reconciled : !transaction.reconciled;
  });

  return (
    <div className="w-screen min-h-screen h-max">
      <Navbar />

      <div className="p-6 mt-[80px]">
        <h2 className="text-xl font-bold mb-4">Bank Reconciliation</h2>

        {/* Filter Buttons */}
        <div className="mb-4">
          <div className="flex space-x-4 mb-4">
            <Button color={filter === 'all' ? 'blue' : 'gray'} onClick={() => setFilter('all')}>
              All
            </Button>
            <Button color={filter === 'reconciled' ? 'blue' : 'gray'} onClick={() => setFilter('reconciled')}>
              Reconciled
            </Button>
            <Button color={filter === 'unreconciled' ? 'blue' : 'gray'} onClick={() => setFilter('unreconciled')}>
              Unreconciled
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button color="green" className="bg-emerald-300" onClick={() => setShowModal(true)}>
              Create Bank Statement
            </Button>
            <Button color="blue" onClick={handleMonthClose}>
              Close Month
            </Button>
            <Button color="red" onClick={handleYearClose}>
              Close Year
            </Button>
          </div>
        </div>

        {/* Modal for creating bank statement */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>Create Bank Statement</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  {...register('date', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  {...register('description', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="debit" className="block text-sm font-medium text-gray-700">
                  Debit
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('debit', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="credit" className="block text-sm font-medium text-gray-700">
                  Credit
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('credit', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="voucher" className="block text-sm font-medium text-gray-700">
                  Voucher ID
                </label>
                <select
                  {...register('voucher', { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Select a Voucher</option>
                  {voucherOptions.map((voucher) => (
                    <option key={voucher.value} value={voucher.value}>
                      {voucher.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" color="blue">
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        {/* Transaction Table */}
        <Table striped={true}>
          <Table.Head className="border">
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Date</Table.HeadCell>
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Description</Table.HeadCell>
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Debit</Table.HeadCell>
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Credit</Table.HeadCell>
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Status</Table.HeadCell>
            <Table.HeadCell className="bg-zinc-800 text-zinc-50">Action</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredTransactions.map((transaction) => (
              <Table.Row key={transaction._id} className="border">
                <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{transaction.description}</Table.Cell>
                <Table.Cell>{transaction.debit.toFixed(2)}</Table.Cell>
                <Table.Cell>{transaction.credit.toFixed(2)}</Table.Cell>
                <Table.Cell>
                  {transaction.reconciled ? (
                    <Badge color="green" className="bg-emerald-600 text-zinc-50">
                      Reconciled
                    </Badge>
                  ) : (
                    <Badge color="red" className="bg-rose-600 text-zinc-50">
                      Unreconciled
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {!transaction.reconciled && (
                    <Button size="xs" color="blue" onClick={() => handleReconcile(transaction._id)}>
                      Reconcile
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default BankReconciliation;
