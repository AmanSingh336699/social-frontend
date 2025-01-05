import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaBars, FaTimes, FaHome, FaSearch, FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slices/authSlice";
import { TbLogout } from "react-icons/tb"

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logout())
        navigate('/login')
    }

    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }


  return (
    <header className='bg-sky-300 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
                <div className='flex-shrink-0 text-xl font-bold'>Social-X</div>
                <div className='hidden lg:flex items-center space-x-6'>
                    <Link to={`/`} className='flex text-xl font-bold items-center hover:underline space-x-2 '>
                        <FaHome />
                        <span>Home</span>
                    </Link>
                    <Link to={`/messages`} className='flex font-bold text-xl hover:underline items-center space-x-2'>
                        <FaEnvelope />
                        <span>Message</span>
                    </Link>
                    <Link to={`/profile/${userId}`} className='flex font-bold text-xl hover:underline items-center space-x-2'>
                        <FaUserCircle />
                        <span>Profile</span>
                    </Link>
                    <Link to={`/search`} className='flex font-bold text-xl hover:underline items-center space-x-2'>
                        <FaSearch />
                        <span>Search</span>
                    </Link>
                    <div onClick={handleLogOut} className='flex font-bold text-xl hover:underline items-center space-x-2'>
                        <TbLogout className="text-2xl"/>
                        <span>LogOut</span>
                    </div>                
                </div>
                <div className='lg:hidden'>
                    <button onClick={toggleMenu} className='flex items-center justify-center w-10 h-10 focus:outline-none'>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
        </div>

        {menuOpen && (
            <div className='lg:hidden text-white'>
                <div className='space-y-2 px-4 py-2'>
                    <Link to={`/`} className='flex items-center text-xl space-x-2 hover:text-rose-400 '>
                        <FaHome />
                        <span>Home</span>
                    </Link>
                    <Link to={`/messages`} className='flex text-xl items-center space-x-2 hover:text-rose-400'>
                        <FaEnvelope />
                        <span>Message</span>
                    </Link>
                    <Link to={`/profile/${userId}`} className='flex text-xl items-center space-x-2 hover:text-rose-400'>
                        <FaUserCircle />
                        <span>Profile</span>
                    </Link>
                    <Link to={`/search`} className='flex text-xl items-center space-x-2 hover:text-rose-400'>
                        <FaSearch />
                        <span>Search</span>
                    </Link>
                    <div onClick={handleLogOut} className='flex font-bold text-xl hover:underline items-center space-x-2'>
                        <TbLogout className="text-2xl"/>
                        <span>LogOut</span>
                    </div>                
                </div>
            </div>
        )}
    </header>
  )
}

export default Header



