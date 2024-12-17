import React, { useState, useEffect } from "react";
import PartyForm from "./PartyForm";
import PartyTable from "./PartyTable";
import axios from "axios";
import { deleteParty, getParties, postParty, updateParty } from "./helper/amApiCalls";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Navbar from "../base/Navbar";
import Sidebar from "../admin/Sidebar";

const PartyMasterPage = ({type = 'eu'}) => {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const {auth} = useAuthContext()

  const {endUser,token} = auth
  // Fetch parties on page load
  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
        const response = await getParties(endUser?._id,token)
  
        if (response.success) setParties(response.data)
      } catch (error) {
        console.error(error);
        toast.error('Failed to load dependencies.');
      }
  };

  const handleAddOrUpdate = async (party) => {
    try {
      if (party._id) {
        const response = await updateParty(endUser?._id,token,party,party._id)

        if (response.success) {
            toast.success('Party updated successfully.')
            setSelectedParty(null); // Clear form
        }else{
            toast.error('Failed to update party.')
            return
        }
      } else {
        const response = await postParty(endUser?._id,token, party)

        if (response.success) {
            toast.success('Party added successfully.')
            setSelectedParty(null); // Clear form
        }else{
            toast.error('Failed to add party.')
            return
        }
      }
      fetchParties(); // Refresh the list
    } catch (error) {
      console.error("Error saving party:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
        const response = await deleteParty(endUser?._id,token, id)

        if (response.success) {
            toast.success('Party deleted successfully.')
            setSelectedParty(null); // Clear form
        }else{
            toast.error('Failed to delete party.')
            return
        }
      fetchParties(); // Refresh the list
    } catch (error) {
      console.error("Error deleting party:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen h-max flex justify-between gap-12">
        <Navbar type={type} />

        {
            type === 'admin' && (
                <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
                    <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
                </div>
            )
        }

        <div className="p-6 mt-[150px] w-full">
            <h1 className="text-2xl font-bold mb-4">Party Master</h1>
            <PartyForm party={selectedParty} onSave={handleAddOrUpdate} />
            <PartyTable parties={parties} onEdit={setSelectedParty} onDelete={handleDelete} />
        </div>
    </div>
  );
};

export default PartyMasterPage;