import React from 'react'
import logo from '../assets/logo.jpg'

function Logo({width="100px", ...props}) {
  return (
    <a href='/' className='inline-block rounded-full'>
      <img 
      src={logo} 
      alt='post-blog' 
      {...props}
      className={`${width} max-h-16 rounded-full`} />
    </a>
  )
}

export default Logo
