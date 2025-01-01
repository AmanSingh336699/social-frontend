import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages } from '../redux/Slices/chatSlice'
import MessageBubble from '../components/MessageBubble'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import socket from '../utils/socket'

function ChatRoom() {
    const { chatId } = useParams()
    const { user } = useSelector(state => state.auth)
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const fetchMessages = async () => {
            const { data } = await axiosInstance.get(`/chats/${chatId}/messages`)
            setMessages(data)
        }
        fetchMessages()

        if(socket){
            socket.emit('joinChat', chatId)

            socket.on('messageReceived', (message) => {
                setMessages((prev) => [...prev, message])
            })

            socket.on('typing', () => {
                setIsTyping(true)
                setTimeout(() => setIsTyping(false), 3000)
        })

        }
        return () => {
            if(socket){
                socket.emit('leaveChat', chatId)
                socket.off('messageReceived')
                socket.off('typing')
            }
        }
    }, [chatId])

    const handleSendMessage = () => {
        if(newMessage.trim()){
            const message = {
                chatId,
                sender: user._id,
                text: newMessage
            }

            socket.emit('sendMessage', message)

            setMessages((prev) => [...prev, { ...message, sender: user }])
            setNewMessage('')
        }
    }

    const handleTyping = () => {
        socket.emit('typing', {chatId, sender: user._id})
    }


  return (
    <div>
        <div>
            {messages.map((message, index) => (
                <MessageBubble key={index} message={message} isOwn={message.sender._id === user._id} />
            ))}
        </div>
        {isTyping && (
            <div className='typing-indicator flex items-center mt-2 gap-1'>
                <div className='dot w-2 h-2 bg-sky-400 rounded-full animate-bounce'></div>
                <div className='dot w-2 h-2 bg-sky-400 rounded-full animate-bounce'></div>
                <div className='dot w-2 h-2 bg-sky-400 rounded-full animate-bounce'></div>
            </div>
        )}

        <div>
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleTyping} className='flex-grow border rounded-lg p-3'
            placeholder='Type a message...' />
            <button onClick={handleSendMessage} className='bg-sky-500 text-white px-2 py-2 rounded-lg'>Send</button>
        </div>
    </div>
  )
}

export default ChatRoom