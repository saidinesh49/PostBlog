import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch=useDispatch();
  const handleLogout=()=>{
    authService.logout().then(()=>{
        dispatch(logout());
        window.location.reload(true);
    });
  }
  return (
    <button onClick={handleLogout} className='ml-1 px-4 py-1 bg-yellow-500 text-black shadow-[4px_4px_0px_0px_rgba(109,40,217)] font-semibold rounded'>
        Logout
    </button>
  )
}

export default LogoutBtn
