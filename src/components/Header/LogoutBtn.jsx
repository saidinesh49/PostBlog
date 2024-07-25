import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch=useDispatch();
  const handleLogout=()=>{
    authService.logout().then(()=>{
        dispatch(logout());
    });
  }
  return (
    <button onClick={handleLogout} className='px-4 py-1 bg-yellow-500 text-black shadow-[4px_4px_0px_0px_rgba(109,40,217)] font-semibold rounded'>
        Logout
    </button>
  )
}

export default LogoutBtn
