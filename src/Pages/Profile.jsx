import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../redux/Slices/usersSlice'
import FollowButton from '../components/FollowButton'
import PostCard from '../components/PostCard'
import { FaUserCircle } from 'react-icons/fa'


function Profile({ userId }) {
    const { user, profile } = useSelector(state => state.users)
  
    const dispatch = useDispatch()

    if(user._id !== userId){
        return <div>Loading Profile...</div>
    }

    useEffect(() => {
      dispatch(fetchUserProfile(userId))
    }, [dispatch, userId])

    if(!profile) return <div>Loading Profile...</div>

  return (
    <div className='container mx-auto py-6'>
        <div className='flex items-center space-x-4'>
          {profile.avatar ? (
            <img src={profile.avatar} alt='Profile-avatar' className='w-20 h-20 rounded-full object-cover' />
          ) : (
            <FaUserCircle className='w-20 h-20 text-gray-400' />
          )}
          <>
            <h1 className='text-2xl font-bold'>{profile.username}</h1>
            <FollowButton userId={profile._id} isFollowing={profile.followers.includes(user._id)} />
          </>
        </div>
        <div className='mt-4 flex space-x-8 text-gray-600'>
          <p>{profile.followers.length} Followers</p>
          <p>{profile.following.length} Following</p>
        </div>
        {profile.posts.length ? (
          <div className='mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {profile.posts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </div>
        ) : (
          <p className='text-gray-400'>This user has not posted anything yet.</p>
        )
      }
    </div>
  )
}

export default Profile