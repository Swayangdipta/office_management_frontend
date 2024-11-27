import React from 'react'

const EmployeeManageForm = ({type = "add"}) => {
  return (
    <div className='w-screen h-max absolute top-0 left-0 p-6 bg-white z-[200000]'>
        <form>
            <h1>{type === "add" ? "Add Employee" : "Edit Employee"}</h1>
        </form>
    </div>
  )
}

export default EmployeeManageForm