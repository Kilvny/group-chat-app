import { Avatar } from '@mui/material'
import React from 'react'
import '../style/sidebar_chat.css'

const SidebarChat = () => {
  return (
    <div className='sidebarChat'>
        <Avatar />
        <div className="sidebarChat__info">
            <h2>
                group name
            </h2>
            <p>
                group info
            </p>
        </div>
    </div>
  )
}

export default SidebarChat