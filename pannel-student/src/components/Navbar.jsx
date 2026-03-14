import React from 'react'
import { NavLink } from 'react-router-dom'
import reactlogo from '../assets/react.svg'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()
    const logout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
        window.location.reload();
    }
    return (
        <div className='flex items-center gap-100 px-4 py-4 border-b border-gray-800'>
            <NavLink to='/'>
            <img src={reactlogo}  />
            </NavLink>
            
            <ul className='hidden md:flex items-start gap-10 '>
                <NavLink to='/info'>
                    <li className='py-1 font-medium'>Student Info</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
                </NavLink>
                <NavLink to='/details'>
                    <li className='py-1 font-medium'>Show Info</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
                </NavLink>
            </ul>
            <div>
                <button onClick={logout} className='border px-4 py-2 font-medium rounded bg-blue-400 text-white cursor-pointer'>Logout</button>
            </div>
        </div>
    )
}
