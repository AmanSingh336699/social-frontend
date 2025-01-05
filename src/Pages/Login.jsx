import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/Slices/authSlice'
import {FaLock} from 'react-icons/fa'
import { HiEyeOff, HiEye } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/'
    const [passwordVisible, setPasswordVisible] = useState(false)

    const dispath = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispath(login(credentials))
        navigate(from, { replace: true })
    }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
            <div className='mb-6 flex justify-center space-x-4'>
                <FaLock className='text-3xl' />
                <h1 className='font-bold text-center text-2xl text-gray-800'>Login</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <input className='w-full mt-2 p-2 border rounded-md focus:outline-none' type="email" placeholder='email' name='email' value={credentials.email} onChange={handleChange}
                    required />
                </div>
                <div className='mb-4 relative'>
                    <input className='w-full mt-2 px-3 py-2 pr-10 border rounded-md focus:outline-none' type={passwordVisible ? "text" : "password"} name='password' placeholder='password' value={credentials.password}
                    onChange={handleChange} required />
                    <button type='button' onClick={() => setPasswordVisible(!passwordVisible)} className='absolute inset-y-0 right-0 px-3 focus:outline-none text-sky-400'>
                       {passwordVisible ? <HiEyeOff size={20} /> : <HiEye size={20} />} 
                    </button>
                </div>
                <button type='submit' className='w-full bg-emerald-500 text-white py-2 rounded-md hover:rounded-xl
                 hover:bg-emerald-600 transition duration-300'>Login</button>
            </form>
            <h2 className='text-center mt-2'>you haven't account? <Link to={`/register`} className='text-sky-500 hover:underline'>register here</Link></h2>
        </div>
    </div>
  )
}

export default Login


