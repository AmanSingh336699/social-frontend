import { FaHeart, FaComment, FaRegHeart, FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../redux/Slices/postSlice'
import { Link } from 'react-router-dom'
import FollowButton from './FollowButton'
import { useState } from 'react'

function PostCard({ post }) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [iseBouncing, setIsBouncing] = useState(false)

    const handleLike = () => {
        dispatch(likePost(post._id))
        setIsBouncing(true)
        setTimeout(() => setIsBouncing(false), 300)
    }

  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
        <div className='flex items-center justify-between p-4'>
            <div className='flex items-center space-x-4'>
                {post.user.avatar ? (
                    <img src={post.user.avatar} alt='avatar' className='w-10 h-10 rounded-full object-cover' />
                ) : (
                    <FaUserCircle className='w-10 h-10 rounded-full text-gray-400' />
                )}
                <span className='font-bold'>{post.user.username}</span>
            </div>
            <FollowButton userId={post.user._id} isFollowing={post.user.followers.includes(user._id)} />
        </div>
        <img src={post.image} alt='Post' className='w-full h-96 object-cover' />
        <div className='p-4'>
            <div className='flex items-center space-x-4'>
                <button onClick={handleLike} className={`text-rose-500 text-xl ${iseBouncing && 'animate-bounce'}`}>
                    {post.likes.includes(user._id) ? (
                        <FaHeart size={20} />
                    ) : (
                        <FaRegHeart size={20} />
                    )}
                </button>
                <Link to={`/comments/${post._id}`} className='hover:text-sky-600'>
                    <FaComment className='text-gray-700 text-xl' />
                </Link>
            </div>
            <p className='mt-4 font-bold'>{post.likes.length}</p>
            <p className='mt-4'>
                <span className='font-bold'>{post.user.username}</span>
                {post.text}
            </p>
        </div>
    </div>
  )
}

export default PostCard