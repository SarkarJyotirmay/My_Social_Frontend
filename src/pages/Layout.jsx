import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import RightPanel from '../components/common/RightPanel'


const Layout = () => {
  return (
    <>
        <div className='parent flex'>
          <Sidebar />
          <Outlet />
          <RightPanel />
        </div>
    </>
  )
}

export default Layout