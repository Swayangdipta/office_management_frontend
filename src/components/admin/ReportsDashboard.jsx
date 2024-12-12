import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import Navbar from "../base/Navbar"; // Import your Navbar component
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const ReportsDashboard = ({ type = 'admin' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { auth } = useAuthContext();
  const { token } = auth;

  return (
    <div className="mx-auto p-6 w-screen relative top-0 h-max flex justify-between gap-12">
      <Navbar type={type} />

      <div className={`${isSidebarOpen ? 'w-[200px]' : 'w-[0px]'} h-screen duration-700`}>
        <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
      </div>

      <div className='w-full'>
        <h2 className="text-2xl font-semibold mb-6 mt-[80px]">All Reports</h2>

        <div className='mt-[40px] flex flex-wrap gap-10'>
          <Link to='/admin/amreports' className='neumorph w-[150px] h-[150px] rounded-[50px] flex flex-col items-center justify-center hover:shadow-none duration-300' >Accounts Reports</Link>
          <Link to='/admin/samreports' className='neumorph w-[150px] h-[150px] rounded-[50px] flex flex-col items-center justify-center hover:shadow-none duration-300' >Store Reports</Link>
          <Link to='/admin/hrreports' className='neumorph w-[150px] h-[150px] rounded-[50px] flex flex-col items-center justify-center hover:shadow-none duration-300' >HR Reports</Link>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
