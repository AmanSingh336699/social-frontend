import { useDispatch, useSelector } from 'react-redux'
import { followUsers } from '../redux/Slices/usersSlice'

function FollowButton({ userId, isFollowing}) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const handleFollow = () => {
        dispatch(followUsers(userId))
    }

    if(user && user._id === userId) return null

  return (
    <button onClick={handleFollow} className={`px-4 py-2 rounded ${
        isFollowing ? 'bg-gray-300 text-gray-700' : 'bg-sky-600 text-white hover:bg-sky-700'
    }`}>
        {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}

export default FollowButton