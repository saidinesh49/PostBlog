import React from 'react'
import { useParams } from 'react-router-dom'

function PageNotFound() {
  const { type }=useParams();
  let errorMessage;
  switch(type){
    case 'connect':
        errorMessage='Failed to connnect, Please try later!';
        break;
    default:
        errorMessage='Page Not Found!';
  }
  return (
    <div className='flex flex-col items-center justify-center py-12 font-bold text-black text-2xl'>
      Oops! {errorMessage}
    </div>
  )
}

export default PageNotFound
