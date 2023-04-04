import React from 'react'
import '../style/sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { IconButton, Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar src='https://lh3.googleusercontent.com/ogw/AOh-ky2P_M7V3QRnF0m3CfgaSdOz-8-pXU68Nn17BsZN=s32-c-mo'/>
            
            <div className="header__right">

                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
        <div className="sidebar__search">
            <div className="search__container">
                <SearchOutlined />
                <input type="text" placeholder='Search or start a new chat'/>
            </div>
        </div>

        <div className="sidebar__chats">
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
        </div>
    </div>
  )
}

export default Sidebar