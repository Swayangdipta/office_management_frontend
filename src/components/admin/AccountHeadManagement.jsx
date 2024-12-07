import React from 'react'
import Navbar from '../base/Navbar'
import AccountHeadForm from './AccountHeadForm'
import AccountHead from './AccountHead'

const AccountHeadManagement = () => {
  return (
    <div className='w-screen min-h-screen h-max'>
        <Navbar type='admin' />
        <AccountHeadForm type="add" />
        <AccountHead />
    </div>
  )
}

export default AccountHeadManagement