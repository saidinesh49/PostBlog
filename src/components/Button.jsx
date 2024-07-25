import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-violet-500',
    textColor='text-black',
    className='',
    ...props
    
  }) {
  return (
      <button className={`px-4 py-1 bg-violet-500 ${className} ${bgColor} ${textColor}`} {...props}>
        {children}</button>
   )
  }

export default Button
