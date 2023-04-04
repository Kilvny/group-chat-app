import MoreVert from '@mui/icons-material/MoreVert'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import AttachFile from '@mui/icons-material/AttachFile'
import { Avatar, IconButton } from '@mui/material'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import React, { useState } from 'react'
import '../style/chat.css'
import axios from '../axios'

function Chat({ messages }) {
    const [input, setInput] = useState("")

    const sendMessage = async (e) => {
        e.preventDefault()
        await axios.post('/api/v1/messages/new', {
            message: input,
            name: "HardCoded Name",
            timestamp: 'Just NOW',
            received: false
        })

        setInput("") // clear the input feild after posting message
    }

  return (
        <div className='chat'>
            <div className="chat__header">
    
                <Avatar />
    
                <div className="chat__headerInfo">
                    <h3>
                        Group Name
                    </h3>
                    <p>
                        Last seen at...
                    </p>
                </div>
                <div className="chat__headerOptions">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message,key)=> {
                    return (

                <p className={`chat__message ${message.received && "chat__sent"}`} key={key}>
                    <span className='chat__name'>{message.name}</span>
                        
                    {message.message}

                    <span className='chat__timestamp'>{message.timestamp}</span>
                </p>

                    )
                })}
{/*                 
                <p className='chat__message chat__sent'>
                    <span className='chat__name'>Kilany</span>
                        
                        This is a message

                    <span className='chat__timestamp'>{
                        new Date().toUTCString()
                    }</span>
                </p> */}
                
            </div>
            <div className="chat__newMessage">
                <InsertEmoticonIcon /> 
                <form>
                    <input value={input} onChange={(e)=> setInput(e.target.value) } type="text" placeholder='Type a message' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
  )
}

export default Chat