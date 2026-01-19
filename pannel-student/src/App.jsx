import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Navbar } from './components/Navbar'
import { Details } from './pages/Details'
import { StudentInfo } from './pages/StudentInfo'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { Show } from './components/Show.jsx'

const App = () => {

  const { token } = useContext(AppContext)
  return token ? (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<Details />} />
        <Route path='/info' element={<StudentInfo />} />
        <Route path='/show' element={<Show />} />
      </Routes>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )

}

export default App


