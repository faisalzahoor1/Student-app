import React, { useContext} from 'react'

import { AppContext } from '../context/AppContext'


export const Details = () => {


  const { setEmail, email, getData } = useContext(AppContext)


  const getStudent = async(e)=>{
    e.preventDefault()
    getData()
  }


  return (
    <div>
      <form onSubmit={getStudent} className=''>
        <div className='flex flex-col items-center gap-5 mt-10 '>
          <label htmlFor="email">Enter Student Email</label>
          <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} value={email} className='border ml-2 px-2 ' />
          <button type='submit' className='border rounded-lg bg-blue-400 text-white px-8 py-2 cursor-pointer'>Find</button>
        </div>
      </form>
    </div>
  )
}
