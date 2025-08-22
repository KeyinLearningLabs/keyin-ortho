import keyinLogo from '../../assets/logo.png'
import { useEffect, useState } from 'react'
import { ContactButtons } from './ContactButtons'

export const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [openNavbar, setOpenNavbar] = useState(false)
  const [isForm, setIsForm] = useState(false)

  useEffect(() => {
    if (window.location.toString().includes('/register')) {
      setIsForm(true)
    }
  }, [])

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    if (!localStorage.getItem('accessToken')) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = '/admin-dashboard'
    } catch (error) {
      console.error('Logout unsuccessful:', error)
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-keyin-white navbar h-min">
      <div className="ml-3 navbar-start">
        <a href="/">
          <img src={keyinLogo} className="p-0 m-0 btn btn-ghost" alt="Keyin Logo" />
        </a>
      </div>
      <div className="hidden navbar-center bg-keyin-white lg:flex"></div>
      <div className="flex items-center navbar-end">
        {isForm ? <img className="h-[120px] m-0 p-0 " /> : <ContactButtons />}
      </div>
    </div>
  )
}
