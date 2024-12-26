import React from 'react'
import Navbar from '../base/Navbar'
import AccountHeadForm from './AccountHeadForm'
import AccountHead from './AccountHead'

const AccountHeadManagement = ({modulee = 'major'}) => {
  return (
    <div className='w-screen min-h-screen h-max'>
        <Navbar type='admin' />
        <AccountHeadForm type="add" modulee={modulee} />
        <AccountHead modulee={modulee} />
    </div>
  )
}

export default AccountHeadManagement