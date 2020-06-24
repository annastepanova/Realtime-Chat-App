import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from './InfoBar'
import Input from './Input'
import Messages from './Messages'
import TextContainer from './TextContainer'
import './Chat.css'

let socket

const Chat = ({location}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = 'https://realtime-talks.herokuapp.com'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)
    
    setName(name)
    setRoom(room)
    
    socket.emit('join', { name, room })

    
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
    socket.on("roomData", ({ users }) => {
      setUsers(users)
    })

    return () => {

      socket.emit('disconnect')
      socket.off()

    }

  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault()

    socket.emit('sendMessage', message, () => setMessage(''))
  }


  return (
    <>
    <div className="outerContainer">
      <div className="iphone">
        <div className="circle"></div>
        <div className="camera"></div>
        <div className="speaker"></div>
        <div className="screen">
          <InfoBar room={room}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          <Messages messages={messages} name={name}/>
        </div>
        <div className="home1"></div>
        <div className="home2"></div>
      </div>
      <TextContainer users={users} />
    </div>
    </>
  )
}

export default Chat
