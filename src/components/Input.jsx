import React, { forwardRef, useId } from 'react'

const Input=forwardRef(function Input({
    label,
    type='text',
    className="",
    ...props
},ref){
    
    const Id=useId()
    return (
        <div className='w-full'>
          {label && <label 
           className='inline-block mb-1 pl-1'
           htmlFor={Id}>
             {label}
           </label>}
           <input 
            type={type}
            className={`px-3 py-2 rouded-md bg-white text-black 
            w-full outline-none border-gray-200 ${className}`}
            ref={ref} 
            {...props}
            id={Id}/>

        </div>
    )
})

export default Input
