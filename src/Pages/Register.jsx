import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../redux/Slices/authSlice'
import { HiEyeOff, HiEye } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(registerUser(formData))
        navigate('/')
    }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl text-center font-bold text-gray-800 mb-4'>Register Here</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <input className='w-full mt-2 p-2 border rounded-md focus:outline-none' type="text" placeholder='Username' name='username' value={formData.username}
                    onChange={handleChange} required />
                </div>
                <div className='mb-4'>
                    <input className='w-full mt-2 p-2 border rounded-md focus:outline-none' type="email" placeholder='email' name='email' value={formData.email} onChange={handleChange}
                    required />
                </div>
                <div className='mb-4 relative'>
                    <input className='w-full mt-2 px-3 py-2 pr-10 border rounded-md focus:outline-none' type={passwordVisible ? "text" : "password"} name='password' placeholder='password' value={formData.password}
                    onChange={handleChange} required />
                    <button type='button' onClick={togglePassword} className='absolute inset-y-0 right-0 px-3 focus:outline-none text-sky-400'>
                       {passwordVisible ? <HiEyeOff size={20} /> : <HiEye size={20} />} 
                    </button>
                </div>
                <button type='submit' className='w-full bg-emerald-500 text-white py-2 rounded-md hover:rounded-xl
                 hover:bg-emerald-600 transition duration-300'>Register</button>
            </form>
            <h2 className='text-center mt-2'>you have account? <Link to={`/login`} className='text-sky-500 hover:underline'>Login here</Link></h2>
        </div>
    </div>
  )
}

export default Register