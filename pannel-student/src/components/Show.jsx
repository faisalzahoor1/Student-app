import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'

export const Show = () => {
    const { stData, getData } = useContext(AppContext)

    useEffect(() => {
        if (!stData) {
            getData()
        }
    }, [])
    return (
        <div className='mt-10 flex flex-col items-center gap-3'>
            <img src={stData.stImg} alt="student" className="w-32 rounded" />
            <h2>Name: {stData.name}</h2>
            <p>Email: {stData.email}</p>
            <p>CGPA: {stData.cgpa}</p>
            <p>Contact: {stData.contact}</p>
            <p>
                {stData.address.line1}
                {stData.address.line2 ? `, ${stData.address.line2}` : ''}
            </p>





        </div>
    )
}


// {stData.address.line2 ? `, ${stData.address.line2}` : ''}