import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChats } from '../redux/Slices/chatSlice'
import ChatListItem from '../components/ChatListItem'

function Messages() {
    const { chats } = useSelector(state => state.chat)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchChats())
    },[dispatch])

  return (
    <div className='container mx-auto py-6 space-y-4'>
        {chats.map((chat) => (
            <ChatListItem key={chat._id} chat={chat} />
        ))}
    </div>
  )
}

export default Messages