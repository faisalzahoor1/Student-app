import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const Edit = () => {

  const { backend_url, token, stData, setstData } = useContext(AppContext)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    cgpa: "",
    address: {
      city: "",
      country: ""
    }
  })

  useEffect(() => {
    if (stData) {
      setFormData({
        name: stData.name || "",
        contact: stData.contact || "",
        cgpa: stData.cgpa || "",
        address: {
          city: stData.address?.city || "",
          country: stData.address?.country || ""
        }
      })
    }
  }, [stData])


  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const { data } = await axios.put(
       backend_url +"/api/student/update-student",
        {
          ...formData,
          email: stData.email,
          address: JSON.stringify(formData.address)
        },
        { headers: { token } }
      )

      if (data.success) {

        toast.success(data.message)

        setstData(data.studentData)

        navigate('/show')

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div>

      <h2>Edit Student</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
        />

        <input
          type="number"
          name="cgpa"
          placeholder="CGPA"
          value={formData.cgpa}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleAddressChange}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.address.country}
          onChange={handleAddressChange}
        />

        <button type="submit">
          Update
        </button>

      </form>

    </div>
  )
}