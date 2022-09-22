import React from 'react'
import { DialogsList } from '../../components/DialogsList/DialogsList'
import { Outlet } from 'react-router-dom'

import './Dialogs.scss'


const Dialogs = () => {

  return(
    <main className='main Dialogs'>
      <DialogsList/>
      <Outlet/>
    </main>
  )
}

export {Dialogs}