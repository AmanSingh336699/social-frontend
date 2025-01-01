import React from 'react'
import { Link } from 'react-router-dom'

function ChatListItem({ chat }) {
  return (
    <Link to={`/chat/${chat._id}`} className='flex items-center space-x-4 bg-white p-4 rounded-lg shadow
    hover:bg-gray-100 transition'>
        <img src={chat.users[1].avatar} alt='Avatar' className='w-12 h-12 rounded-full object-cover' />
        <>
            <h3 className='font-bold'>{chat.users[1].username}</h3>
            <p className='text-gray-500 text-sm truncate'>{chat.lastMessage?.text || 'No Message yet'}</p>
        </>
    </Link>
  )
}

export default ChatListItem