import { useContext, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const {backend_url, setToken} = useContext(AppContext)
  const navigate = useNavigate();
  const submitForm = async(event)=>{
    event.preventDefault();
    try {
      const {data} = await axios.post(backend_url+'/api/student/login', {Email,Password})
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <form onSubmit={submitForm} className='flex flex-col items-center justify-center ml-4 mr-4 mt-4 py-10 px-10 gap-5 '>
        <div className='flex gap-5'>
          <label htmlFor="email">Student Email</label>
          <input id='email' type="email"  className='border px-2' onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className='flex gap-5'>
          <label htmlFor="password">Student Password</label>
          <input id='password' type="password"  className='border px-2' onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <div>
          <button type='submit' className='border px-4 py-2 font-medium rounded bg-blue-400 text-white cursor-pointer'>Login</button>
        </div>

      </form>
    </div>
  )
}





