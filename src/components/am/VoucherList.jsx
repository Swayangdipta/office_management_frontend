import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'flowbite-react';
import { getAllVouchers } from './helper/amApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import VoucherForm from './Voucher'; // Assuming you have this component for the form
import VoucherFormat from './VoucherFormat';
import { MdClose } from 'react-icons/md';

const VouchersList = ({type = 'eu'}) => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null); // For modal
  const [theTransactions, setTheTransactions] = useState(null); // For modal
  const [forPrint, setForPrint] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth } = useAuthContext();
  const { endUser, token } = auth;

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await getAllVouchers(endUser?._id, token);
        if (response.success) {
          setVouchers(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch vouchers:', error);
      }
    };

    fetchVouchers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/vouchers/${id}`);
      setVouchers(vouchers.filter((voucher) => voucher._id !== id));
    } catch (error) {
      console.error('Failed to delete voucher:', error);
    }
  };

  const viewTransactions = (voucher) => {
    console.log(voucher);
    
    setTheTransactions(voucher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
  };

  const closeTransactions = () => {
    setTheTransactions(null)
    isModalOpen(false)
  }

  const openEditModal = (voucher) => {
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  const handleDownload = (voucher) => {

  };
  

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Vouchers</h2>
      <Table striped={true}>
        <Table.Head className='border'>
          <Table.HeadCell className='bg-zinc-700 text-zinc-50'>Entry Date</Table.HeadCell>
          <Table.HeadCell className='bg-zinc-700 text-zinc-50'>Voucher Type</Table.HeadCell>
          <Table.HeadCell className='bg-zinc-700 text-zinc-50'>Payee</Table.HeadCell>
          <Table.HeadCell className='bg-zinc-700 text-zinc-50'>Narration</Table.HeadCell>
          <Table.HeadCell className='bg-zinc-700 text-zinc-50'>Is Balanced</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {vouchers.map((voucher, index) => (
            <React.Fragment key={index}>
              {/* Voucher Details Row */}
              <Table.Row className={`border border-b-0 ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-zinc-100'}`}>
                <Table.Cell>{new Date(voucher.entryDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{voucher.voucherType}</Table.Cell>
                <Table.Cell>{voucher.payee ? voucher.payee.name : '-N/A-'}</Table.Cell>
                <Table.Cell>{voucher.narration}</Table.Cell>
                <Table.Cell>{voucher.isBalanced ? 'Yes' : 'No'}</Table.Cell>
              </Table.Row>

              {/* Buttons Row */}
              <Table.Row className={`border border-t-0 ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-zinc-100'}`}>
                <Table.Cell colSpan="5" className="text-center">
                  <div className="flex justify-center space-x-4">
                    <Button
                      size="xs"
                      color="blue"
                      onClick={() => viewTransactions(voucher)}
                    >
                      View Transactions
                    </Button>
                    <Button
                      size="xs"
                      color='yellow'
                      className='bg-amber-400'
                      onClick={() => openEditModal(voucher)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      className='bg-rose-600 text-zinc-50'
                      onClick={() => setForPrint(voucher)}
                    >
                      View & Download
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>

      {/* Modal for Viewing Transactions */}
      {theTransactions && (
        <Modal show={isModalOpen} onClose={closeTransactions} className='mt-[130px]'>
          <Modal.Header>
            Transactions for Voucher: {theTransactions.narration}
          </Modal.Header>
          <Modal.Body>
            {theTransactions.transactions && theTransactions.transactions.length > 0 ? (
              <div>
                <Table striped={true}>
                  <Table.Head>
                    <Table.HeadCell>Account Head</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {theTransactions.transactions.map((transaction, idx) => (
                      <Table.Row key={idx}>
                        <Table.Cell>{transaction.accountHead.name}</Table.Cell>
                        <Table.Cell>{transaction.type}</Table.Cell>
                        <Table.Cell>{transaction.amount}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            ) : (
              <p>No transactions available for this voucher.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal for Editing Voucher */}
      {selectedVoucher && (
        <Modal show={isModalOpen} onClose={closeModal}>
          <Modal.Header>
            Edit Voucher: {selectedVoucher.narration}
          </Modal.Header>
          <Modal.Body>
            <VoucherForm typee='admin' voucher={selectedVoucher} onClose={closeModal} />
          </Modal.Body>
        </Modal>
      )}
      {
        forPrint && (
          <div className='w-screen h-max flex items-center justify-center bg-[#00000080] fixed top-0 left-0 z-[99999999] p-4'>
            <p onClick={e=>setForPrint(null)} className='w-[40px] h-[40px] absolute top-[30px] left-[200px] flex items-center justify-center text-white bg-rose-500 rounded-full text-[20px] cursor-pointer z-[999999999]'><MdClose /></p>
            <VoucherFormat voucher={forPrint} />
          </div>
        )
      }
    </div>
  );
};

export default VouchersList;