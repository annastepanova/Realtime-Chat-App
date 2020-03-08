import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message'

import './Messages.css'

const Messages = ({messages, name}) => (
  <ScrollToBottom>
    {messages.map((message, index) => <div key={index}><Message message={message} name={name}/></div>)}

  </ScrollToBottom>


)


export default Messages
