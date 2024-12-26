import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Navbar from '../base/Navbar';
import { createVoucher, getAllAccountHeadAM, getAllAccountSubHeadAM, getApprovingAuthorityAM, getParties, updateVoucher } from './helper/amApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import VouchersList from './VoucherList';
import Sidebar from '../admin/Sidebar';

const VoucherForm = ({ voucher = null, onClose = () => {}, typee = 'eu' }) => {
  const [payees, setPayees] = useState([]);
  const [accountHeads, setAccountHeads] = useState([]);
  const [subMajorHeads, setSubMajorHeads] = useState([]);
  const [subMajorHead, setSubMajorHead] = useState(null);
  const [tempHead, setTempHead] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [approvingAuthorities, setApprovingAuthorities] = useState([])

  const { auth } = useAuthContext();
  const { endUser, token } = auth;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const partyResponse = await getParties(endUser?._id, token);
        if (partyResponse.success) {
          setPayees(partyResponse.data);
        } else {
          toast.error('Failed to load payees.');
        }

        const accountHeadResponse = await getAllAccountHeadAM(endUser?._id, token, 'major');
        console.log(accountHeadResponse);
        

        if (accountHeadResponse.success) {
          setAccountHeads(accountHeadResponse.data.accountingHeads);
        } else {
          toast.error('Failed to load account heads.');
        }
      } catch (error) {
        toast.error('Error loading data.');
        console.error(error);
      }
    };

    fetchData();
  }, [endUser?._id, token]);

  useEffect(() => {
    const fetchData = async () => {
      const accountSubMajorResponse = await getAllAccountSubHeadAM(endUser?._id, token, 'sub-major', tempHead);

      if (accountSubMajorResponse.success) {
        setSubMajorHeads(accountSubMajorResponse.data.accountingHeads);
      } else {
        toast.error('Failed to load account heads.');
      }
    }

    fetchData();

  },[tempHead])

  useEffect(() => {
    const fetchApprovingAuthorities = async () => {
      try {
        const response = await getApprovingAuthorityAM(endUser?._id, token);
        if (response.success) {
          setApprovingAuthorities(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch approving authorities:', error);
      }
    }

    fetchApprovingAuthorities();
  },[])

  const formik = useFormik({
    initialValues: {
      entryDate: voucher ? new Date(voucher.entryDate).toISOString().split('T')[0] : '',
      voucherType: voucher?.voucherType || '',
      payee: voucher?.payee?._id || null,
      approvingAuthority: voucher?.approvingAuthority?._id || null,
      narration: voucher?.narration || '',
      transactions: voucher?.transactions || [],
    },
    onSubmit: async (values) => {
      try {
        if (voucher) {
          const response = await updateVoucher(endUser?._id, token, voucher._id, values);
          if (response.success) {
            toast.success('Voucher updated successfully.');
            onClose();
          } else {
            toast.error('Failed to update voucher.');
          }
        } else {
          const response = await createVoucher(endUser?._id, token, values);
          if (response.success) {
            toast.success('Voucher created successfully.');
            formik.resetForm();
          } else {
            toast.error('Failed to create voucher.');
          }
        }
      } catch (error) {
        toast.error('Error saving voucher.');
        console.error(error);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.entryDate) errors.entryDate = 'Required';
      if (!values.voucherType) errors.voucherType = 'Required';
      if (!values.narration) errors.narration = 'Required';
      const debitTotal = values.transactions
        .filter((t) => t.debit > 0)
        .reduce((sum, t) => sum + Number(t.debit), 0);
      const creditTotal = values.transactions
        .filter((t) => t.credit > 0)
        .reduce((sum, t) => sum + Number(t.credit), 0);
      if (debitTotal !== creditTotal) {
        errors.transactions = 'Debit and Credit amounts must balance';
      }
      return errors;
    },
  });

  const handleTransactionChange = (index, field, value) => {
    const updatedTransactions = formik.values.transactions.map((transaction, i) =>
      i === index ? { ...transaction, [field]: value } : transaction
    );
    formik.setFieldValue('transactions', updatedTransactions);
  };

  const addTransaction = () => {
    const newTransaction = { accountHead: '', type: '', credit: '', debit: '', subMajorHead: ''};
    
    newTransaction.subMajorHead = subMajorHead
    formik.setFieldValue('transactions', [...formik.values.transactions, newTransaction]);
  };

  const removeTransaction = (index) => {
    const updatedTransactions = formik.values.transactions.filter((_, i) => i !== index);
    formik.setFieldValue('transactions', updatedTransactions);
  };

  return (
    <div className={`w-screen h-screen flex justify-between gap-12 ${voucher && 'absolute top-[60px] -left-6'}`}>
      <Navbar type={typee} />

      {
            typee === 'admin' && (
                <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
                    <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
                </div>
            )
        }

      <div className={`p-6 w-full ${voucher ? 'bg-white' : 'mt-[140px]'}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">{voucher ? 'Edit Voucher' : 'Create Voucher'}</h2>
          {voucher && (
            <MdClose
              className="bg-rose-500 text-zinc-50 rounded text-[30px] cursor-pointer"
              onClick={onClose}
            />
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="entryDate" className="block text-sm font-medium text-gray-700">
              Entry Date
            </label>
            <input
              type="date"
              id="entryDate"
              name="entryDate"
              value={formik.values.entryDate}
              onChange={formik.handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.errors.entryDate && <p className="text-red-500">{formik.errors.entryDate}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="voucherType" className="block text-sm font-medium text-gray-700">
              Voucher Type
            </label>
            <select
              id="voucherType"
              name="voucherType"
              value={formik.values.voucherType}
              onChange={formik.handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" label="Select type" />
              <option value="Disbursement" label="Disbursement" />
              <option value="Journal" label="Journal" />
              <option value="Others" label="Others" />
            </select>
            {formik.errors.voucherType && (
              <p className="text-red-500">{formik.errors.voucherType}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="voucherType" className="block text-sm font-medium text-gray-700">
              Approving Authority
            </label>
            <select
              id="approvingAuthority"
              name="approvingAuthority"
              value={formik.values.approvingAuthority}
              onChange={formik.handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" label="Select approving authority" />
              {approvingAuthorities.map((authority) => (
                <option key={authority._id} value={authority._id}>
                  {authority.name}
                </option>
              ))}
            </select>
            {formik.errors.voucherType && (
              <p className="text-red-500">{formik.errors.voucherType}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="payee" className="block text-sm font-medium text-gray-700">
              Payee
            </label>
            <select
              id="payee"
              name="payee"
              value={formik.values.payee}
              onChange={formik.handleChange}
              disabled={formik.values.voucherType === 'Others'}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" label="Select payee" />
              {payees.map((payee) => (
                <option key={payee._id} value={payee._id}>
                  {payee.name}
                </option>
              ))}
            </select>
            {formik.errors.payee && <p className="text-red-500">{formik.errors.payee}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="narration" className="block text-sm font-medium text-gray-700">
              Narration
            </label>
            <textarea
              id="narration"
              name="narration"
              value={formik.values.narration}
              onChange={formik.handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.errors.narration && (
              <p className="text-red-500">{formik.errors.narration}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Transactions</h3>
            {formik.values.transactions.map((transaction, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <div className="w-1/4">
                  <select
                    value={transaction.accountHead}
                    onChange={(e) => {
                      handleTransactionChange(index, 'accountHead', e.target.value)
                      setTempHead(e.target.value)
                    }}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="" label="Select Major Head" />
                    {accountHeads.map((accountHead) => (
                      <option key={accountHead._id} value={accountHead._id}>
                        {accountHead.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/4">
                  <select
                    value={transaction.subMajorHead}
                    onChange={(e) => handleTransactionChange(index, 'subMajorHead', e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="" label={transaction.subMajorHead === '' ? 'Selected' : 'Select Sub Major Head'} />
                    {subMajorHeads.map((accountHead) => (
                      <option key={accountHead._id} value={accountHead._id}>
                        {accountHead.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/4">
                   <input
                   type="number"
                   value={transaction.debit}
                   onChange={(e) => handleTransactionChange(index, 'debit', e.target.value)}
                   className="block w-full p-2 border border-gray-300 rounded-md text-rose-500"
                   placeholder='Debit Amount'
                 />
                </div>
                <div className="w-1/4 flex items-center space-x-2">
                  <input
                    type="number"
                    value={transaction.credit}
                    onChange={(e) => handleTransactionChange(index, 'credit', e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md text-green-500"
                    placeholder='Credit Amount'
                  />
                  <button
                    type="button"
                    onClick={() => removeTransaction(index)}
                    className="text-red-500 font-bold"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

            {
              formik.values.transactions.length === 0 && (
                <button
                  type="button"
                  onClick={addTransaction}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Transaction
                </button>                
              )
            }

          </div>

          {formik.errors.transactions && (
            <p className="text-red-500 mb-4">{formik.errors.transactions}</p>
          )}

          <button
            type="submit"
            disabled={!!formik.errors.transactions}
            className="w-full px-4 py-2 bg-emerald-500 text-white rounded"
          >
            {voucher ? 'Update Voucher' : 'Create Voucher'}
          </button>
        </form>

        {!voucher && <VouchersList />}
      </div>
    </div>
  );
};

export default VoucherForm;