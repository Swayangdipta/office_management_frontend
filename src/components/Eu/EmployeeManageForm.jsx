import React, { useEffect, useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { addEmployeeHrm, editEmployeeHrm, getDesignations, getEmployee } from './helper/euApiCalls';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const EmployeeManageForm = ({type = "add",setIsFormOpen = f => f, employee_id = ''}) => {
    const [employee, setEmployee] = useState({
        fullname: "",
        date_of_birth: "", // Use a string for dates initially, e.g., 'YYYY-MM-DD'
        cid: "",
        emp_id: "",
        tpn_acc_num: "",
        has_gis: false,
        gis_acc_num: "",
        has_pf: false,
        pf_acc_num: "",
        sav_acc_num: "",
        bank_name: "",
        bank_branch: "",
        benefits: {}, // Object can be populated later
        deductions: {}, // Object can be populated later
        qualifications: [], // Array for storing qualification details
      });

    const [designations, setDesignations] = useState([])
    const [designation, setDesignation] = useState(null)

    const [miscellenous,setMiscellenous] = useState({
        basic_pay: 0,
        allowances: 0,
        tds: 0,
        pf: 0,
        gis: 0,
        tempQualifications: ""
    })

    const {basic_pay,allowances,tds,pf,gis,tempQualifications} = miscellenous
      
    // Destructure employee state
    const {
    fullname,
    date_of_birth,
    cid,
    emp_id,
    tpn_acc_num,
    has_gis,
    gis_acc_num,
    has_pf,
    pf_acc_num,
    sav_acc_num,
    bank_name,
    bank_branch,
    benefits,
    deductions,
    qualifications,
    } = employee;

    const {auth} = useAuthContext()
    const {endUser, token} = auth


      
      const handleChange = (e,field) => {
        if(field == "tempQualifications" || field == "basic_pay" || field == "allowances" || field == "tds" || field == "pf" || field == "gis"){            
            setMiscellenous({...miscellenous, [field]: e.target.value})
        }else{
            setEmployee({ ...employee, [field]: e.target.value})
        }
      }

      const handleEdit = (updatedEmployee) => {
        editEmployeeHrm(updatedEmployee,endUser._id,token,employee_id).then(data => {
            console.log(data);
            
            if(data.success){
                toast.success("Employee Updated Successfully")
                setIsFormOpen(false)
            }else{
                toast.error("Failed to Update Employee")
            }
        }).catch(error => {
            toast.error(error?.response?.data?.error)
        })
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Prepare the updated state
        const tempFications = tempQualifications.split(',');
        const tempBenefits = {
          basic_pay: basic_pay,
          allowances: allowances,
        };
        const tempDeductions = {
          tds: tds,
          pf: pf,
          gis: gis,
        };
      
        const updatedEmployee = {
          ...employee,
          qualifications: tempFications,
          benefits: tempBenefits,
          deductions: tempDeductions,
        };
      
        // Update the state
        setEmployee(updatedEmployee);

        if(type !== "add"){
            handleEdit(updatedEmployee)
            return
        }
      
        addEmployeeHrm(updatedEmployee,endUser._id,token,designation).then(data => {
            if(data.success){
                toast.success("Employee Added Successfully")
                setIsFormOpen(false)
            }else{
                toast.error("Failed to Add Employee")
            }
        }).catch(error => {
            toast.error(error?.response?.data?.error)
        })
      };

      const fetchDesignations = () => {
        getDesignations(endUser._id,token).then(data => {
            if(data.error){
                console.log(data.error);
            }

            setDesignations(data.message)
        }).catch(error => {
            console.log(error);
        })
      }

      const getEmployeeData = () => {
        getEmployee(endUser._id,token,employee_id).then(employeeData => {
            console.log();
            
            if(employeeData.success){
                setEmployee({
                    fullname: employeeData.data.fullname,
                    date_of_birth: employeeData.data.date_of_birth.slice(0,10), // Use a string for dates initially, e.g., 'YYYY-MM-DD'
                    cid: employeeData.data.cid,
                    emp_id: employeeData.data.emp_id || "", // Ensure emp_id is optional
                    tpn_acc_num: employeeData.data.tpn_acc_num || "",
                    has_gis: employeeData.data.has_gis || false,
                    gis_acc_num: employeeData.data.gis_acc_num || "",
                    has_pf: employeeData.data.has_pf || false,
                    pf_acc_num: employeeData.data.pf_acc_num || "",
                    sav_acc_num: employeeData.data.sav_acc_num || "",
                    bank_name: employeeData.data.bank_name || "",
                    bank_branch: employeeData.data.bank_branch || "",
                  });
                  
                  setMiscellenous({
                    pf: employeeData.data.deductions.pf || 0,
                    gis: employeeData.data.deductions.gis || 0,
                    tds: employeeData.data.deductions.tds || 0,
                    basic_pay: employeeData.data.benefits.basic_pay || 0,
                    allowances: employeeData.data.benefits.allowances || 0,
                    tempQualifications: employeeData.data.qualifications.join(', ') || [],
                  })

                  return
            }

            return toast.error('Faild to load employee information')
        }).catch(error => {
            console.log(error);
            return toast.error('Faild to load employee information')
        })
      }
      
      useEffect(()=>{
        if(type !== "add"){
            getEmployeeData()
        }
        fetchDesignations()
      },[])

  return (
    <div className='w-screen min-h-screen h-max absolute top-0 left-0 p-6 bg-white z-[20000000]'>
        <form>
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-sky-600 underline underline-offset-8 text-[26px] font-bold text-left'>{type === "add" ? "Add Employee" : "Edit Employee"}</h1>
                <IoCloseCircle onClick={e => setIsFormOpen(false)} className='text-[44px] text-rose-500' />
            </div>

            <div className="grid gap-4 mb-4 mt-4 sm:grid-cols-2">
                <div>
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Employee Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type employee name"
                    required
                    value={fullname}
                    onChange={e => handleChange(e, 'fullname')}
                />
                </div>
                <div>
                <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Employee Id
                </label>
                <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Employee Id"
                    required
                    value={emp_id}
                    onChange={e => {
                        if(type === "add"){
                            handleChange(e, 'emp_id')
                        }
                    }}

                    disabled={type === "edit" ? true : false} 
                />
                </div>
                <div>
                <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Date of birth
                </label>
                <input
                    type="date"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    
                    required
                    value={date_of_birth}
                    onChange={e => handleChange(e,'date_of_birth')}
                />
                </div>

                <div>
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                    <select value={designation} onChange={e => setDesignation(e.target.value)} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected="">Select designation</option>
                        {
                            designations.length > 0 && designations.map((item, index) => (
                                <option key={index} value={item._id}>{item.title}</option>
                            ))
                        }
                    </select>
                </div>

                <div>
                <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Employee CID
                </label>
                <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Employee CID"
                    required
                    value={cid}
                    onChange={e => handleChange(e, 'cid')}
                />
                </div>

                <div>
                <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    TPN Account Number
                </label>
                <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Employee TPN Account Number"
                    required
                    value={tpn_acc_num}
                    onChange={e => handleChange(e, 'tpn_acc_num')}
                />
                </div>


                <div>
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Has Gis Number?</label>
                    <select value={has_gis} onChange={e => handleChange(e,'has_gis')} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected="">Has Gis Number?</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        GIS Account Number
                    </label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Employee GIS Account Number"
                        required
                        value={gis_acc_num}
                        onChange={e => handleChange(e, 'gis_acc_num')}
                    />
                </div>

                <div>
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Has PF Number?</label>
                    <select value={has_pf} onChange={e=>handleChange(e, 'has_pf')} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected="">Has PF Number?</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        PF Account Number
                    </label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Employee GIS Account Number"
                        required
                        value={pf_acc_num}
                        onChange={e => handleChange(e, 'pf_acc_num')}
                    />
                </div>

                <div className='sm:col-span-2 underline'>Bank details</div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Savings Account Number
                    </label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Savings Account Number"
                        required
                        value={sav_acc_num}
                        onChange={e => handleChange(e, 'sav_acc_num')}
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Bank Name
                    </label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Bank name"
                        required
                        value={bank_name}
                        onChange={e => handleChange(e, 'bank_name')}
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Bank Branch Name
                    </label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Bank branch name"
                        required
                        value={bank_branch}
                        onChange={e => handleChange(e, 'bank_branch')}
                    />
                </div>

                <div className='sm:col-span-2 underline'>Benefits</div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Basic Pay
                    </label>
                    <input
                        type="number"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Basic Pay"
                        required
                        value={basic_pay}
                        onChange={e => handleChange(e, 'basic_pay')}
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Allowances
                    </label>
                    <input
                        type="number"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Allowances"
                        required
                        value={allowances}
                        onChange={e => handleChange(e, 'allowances')}
                    />
                </div>

                <div className='sm:col-span-2 underline'>Deductions</div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        TDS
                    </label>
                    <input
                        type="number"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="TDS"
                        required
                        value={tds}
                        onChange={e => handleChange(e, 'tds')}
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        PF
                    </label>
                    <input
                        type="number"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="PF"
                        required
                        value={pf}
                        onChange={e => handleChange(e, 'pf')}
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        GIS
                    </label>
                    <input
                        type="number"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="GIS"
                        required
                        value={gis}
                        onChange={e => handleChange(e, 'gis')}
                    />
                </div>

                <div className='sm:col-span-2'>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Qualifications (Separated by comma)
                    </label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Qualifications"
                        required
                        value={tempQualifications}
                        onChange={e => handleChange(e,'tempQualifications')}
                    />
                </div>
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="text-white inline-flex items-center bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                ></path>
                </svg>
                {
                    type === 'add' ? 'Add Employee' : 'Update Employee'
                }
            </button>
        </form>
    </div>
  )
}

export default EmployeeManageForm