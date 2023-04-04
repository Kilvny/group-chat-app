import './style/App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js'
import axios from './axios'


function App() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
      axios.get('api/v1/messages/sync').then((response) => {
        setMessages(response.data)
      })
      
    }, [])
    
    useEffect(() => {
        const pusher = new Pusher('9f23045bbbd4eff4bd1f', {
            cluster: 'eu'
          });
      
          const channel = pusher.subscribe('messages');
          channel.bind('inserted', function(data) {
            // alert(JSON.stringify(data));
            setMessages([...messages, data])

          });
          // cleanup function 
          // we wanna make sure we have only one listener ( one subscriber ) not everytime someone sends a messages we set a new listener 
          return () => {
            channel.unbind_all()
            channel.unsubscribe()
          }
    }, [messages])
    
    console.log(messages)

    
  return (
    <div className="app">
        <div className="app__body">

        {/* Sidebar - component*/}
        <Sidebar />
        {/* Chat - component */}
        <Chat messages={messages}/>
        </div>
    </div>
  );
}

export default App;
