import { useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsers } from '../redux/Slices/usersSlice'
import { FaSpinner } from 'react-icons/fa'


function Search() {
    const [query, setQuery] = useState('')
    const [isPending, startTransition] = useTransition()
    const [debounceTimer, setDebounceTimer] = useState(null)
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)

    const handleInputChange = (e) => {
        const value = e.target.value
        setQuery(value)

        if(debounceTimer)
            clearTimeout(debounceTimer)

        setDebounceTimer(
            setTimeout(() => {
                startTransition(() => {
                    dispatch(searchUsers(value))
                })
            }, 300)
        )
    }
  return (
    <div className='container mx-auto py-6'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Search Users</h1>
        <div className='flex w-full space-x-4 mb-4'>
            <input type="text" placeholder='Search for users...' value={query} onChange={handleInputChange}
            className='flex-grow w-1/2 border p-2 rounded' />
        </div>

        {isPending && (
            <div className='flex justify-center items-center py-6'>
                <FaSpinner className='text-sky-600 text-4xl animate-spin' />
            </div>
        )}

        <div className='space-y-4'>
            {users.map((user) => (
                <div key={user._id} className='flex items-center justify-between bg-white p-4 rounded shadow'>
                    <div className='flex items-center space-x-4'>
                        <img src={user.avatar} alt='avatar' className='w-10 h-10 rounded-full' />
                        <span className='font-bold'>{user.username}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Search