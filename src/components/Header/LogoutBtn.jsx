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
    <button onClick={handleLogout} className='ml-1 px-4 py-2 bg-[#d3cece] transition-shadow duration-300 ease-in-out text-black hover:bg-[#DAC6BD] hover:shadow-[4px_4px_0px_0px_rgba(109,40,217)] font-semibold rounded'>
        Logout
    </button>
  )
}

export default LogoutBtn
