import React, { useContext, useState } from 'react'
import assets from '../assets/upload_area.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { AppContext } from '../context/AppContext'
export const StudentInfo = () => {
  const [stImg, setstImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contact, setContact] = useState('')
  const [Address1, setAddress1] = useState('')
  const [Address2, setAddress2] = useState('')
  const [cgpa, setCgpa] = useState('')
  const [pdf, setPdf] = useState(false)
  const [loading, setLoading] = useState(false)
  const { backend_url, token } = useContext(AppContext)

  const SubmitForm = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true)
    try {
      if (!stImg) {
        return toast.error("Image not selected")
      }
      const formData = new FormData();

      formData.append('stImg', stImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('contact', contact)
      formData.append('address', JSON.stringify({ line1: Address1, line2: Address2 }))
      formData.append('cgpa', cgpa)
      formData.append('pdf', pdf)
      const { data } = await axios.post(backend_url + '/api/student/add-student', formData, { headers: { token } })
      // console.log("hello")
      if (data.success) {
        toast.success(data.message)
        setstImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setContact('')
        setAddress1('')
        setAddress2('')
        setCgpa('')
        setPdf(false)
      } else {
        // console.log("hi")
        toast.error(data.message)
        setstImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setContact('')
        setAddress1('')
        setAddress2('')
        setCgpa('')
        setPdf(false)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col center-items gap-5'>
      <p className='font-bold py-2 px-4'>Student Information</p>
      <form onSubmit={SubmitForm} className='ml-[30rem] border rounded-lg bg-blue-100 w-[30rem] h-[55rem] py-10'>
        <div className='flex justify-center py-4'>
          <label htmlFor="file">
            <img src={stImg ? URL.createObjectURL(stImg) : assets} alt="" className='bg-gray-100 rounded-full cursor-pointer w-20' />
          </label>
          <input onChange={(e) => setstImg(e.target.files[0])} type="file" hidden id='file' />
          <p className='font-medium mt-20 ml-[-90px]'>Upload a Picture</p>
        </div>
        <div className='flex justify-center py-4'>
          <label htmlFor="" className='font-medium text-lg'>Name</label>
          <input type="text" className='border rounded-md ml-2 w-80 h-10 px-4' onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div className='flex justify-center py-4'>
          <label htmlFor="" className='font-medium text-lg'>Email</label>
          <input type="email" className='border rounded-md  ml-2 w-80 h-10 px-4' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='flex justify-center py-4'>
          <label htmlFor="" className='font-medium text-lg'>Password</label>
          <input type="password" className='border rounded-md  ml-2 w-80 h-10 px-4' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <div className='flex justify-center py-4'>
          <label htmlFor="" className='font-medium text-lg'>Contact</label>
          <input type="number" className='border rounded-md  ml-2 w-80 h-10 px-4' onChange={(e) => setContact(e.target.value)} value={contact} />
        </div>

        <div className='flex flex-col justify-center py-4'>
          <label htmlFor="" className='font-medium text-lg px-9 '>Address</label>
          <input type="text" className='border rounded-md  ml-28 w-80 h-10 px-4' onChange={(e) => setAddress1(e.target.value)} value={Address1} />
          <input type="text" className='border rounded-md  ml-28 mt-2 w-80 h-10 px-4' onChange={(e) => setAddress2(e.target.value)} value={Address2} />
        </div>

        <div className='flex justify-center py-4'>
          <label htmlFor="" className='font-medium text-lg'>CGPA</label>
          <input type="number" className='border rounded-md  ml-2 w-80 h-10 px-4' onChange={(e) => setCgpa(e.target.value)} value={cgpa} />
        </div>

        <div className='flex justify-center py-4'>
          <label htmlFor="pdf-file" className='cursor-pointer'>
            {pdf && (
              <iframe
                src={pdf ? URL.createObjectURL(pdf) : ''}
                className={`ml-10 w-full border cursor-pointer ${pdf ? "h-50" : "h-9"}`}
                title="PDF Preview"
              />
            )}
          </label>
          <input type="file" accept='application/pdf' id='pdf-file' onChange={(e) => setPdf(e.target.files[0])} className='ml-10 cursor-pointer' />
        </div>


        <div className='flex justify-center'>
          <button type='submit' disabled={loading} className='border rounded-lg py-2 px-4 text-white bg-blue-500 cursor-pointer'>{loading ? "Submitting..." : "Submit"}</button>
        </div>
      </form>

    </div>
  )
}
